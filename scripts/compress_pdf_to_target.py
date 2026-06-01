import argparse
import io
import os
from pathlib import Path

import img2pdf
from PIL import Image
import pypdfium2 as pdfium


def render_pages_to_jpeg_bytes(pdf_path: str, dpi: int, quality: int):
    doc = pdfium.PdfDocument(pdf_path)
    images = []
    scale = dpi / 72.0

    for i in range(len(doc)):
        page = doc[i]
        bitmap = page.render(scale=scale)
        pil = bitmap.to_pil().convert("RGB")
        bio = io.BytesIO()
        pil.save(bio, format="JPEG", quality=quality, optimize=True)
        images.append(bio.getvalue())

    return images


def build_pdf_bytes(pdf_path: str, dpi: int, quality: int) -> bytes:
    images = render_pages_to_jpeg_bytes(pdf_path, dpi=dpi, quality=quality)
    return img2pdf.convert(images)


def compress_to_target(input_pdf: str, output_pdf: str, target_bytes: int):
    dpis = [160, 140, 120, 105, 96, 85]
    best_payload = None
    best_meta = None

    for dpi in dpis:
        low, high = 35, 90
        local_best = None
        local_meta = None

        while low <= high:
            q = (low + high) // 2
            payload = build_pdf_bytes(input_pdf, dpi=dpi, quality=q)
            size = len(payload)

            if size <= target_bytes:
                local_best = payload
                local_meta = (dpi, q, size)
                low = q + 1  # maximize quality while staying under target
            else:
                high = q - 1

        if local_best is not None:
            best_payload = local_best
            best_meta = local_meta
            break

    if best_payload is None:
        # fallback: generate smallest possible among very low settings
        payload = build_pdf_bytes(input_pdf, dpi=72, quality=30)
        best_payload = payload
        best_meta = (72, 30, len(payload))

    Path(output_pdf).write_bytes(best_payload)
    return best_meta


def main():
    parser = argparse.ArgumentParser(description="Compress scanned PDF to target max size.")
    parser.add_argument("input_pdf")
    parser.add_argument("output_pdf")
    parser.add_argument("--target-mb", type=float, default=3.0)
    args = parser.parse_args()

    target_bytes = int(args.target_mb * 1024 * 1024)

    if not os.path.exists(args.input_pdf):
        raise FileNotFoundError(f"Input not found: {args.input_pdf}")

    dpi, quality, final_size = compress_to_target(args.input_pdf, args.output_pdf, target_bytes)

    print(f"Output: {args.output_pdf}")
    print(f"DPI: {dpi}, JPEG quality: {quality}")
    print(f"Final size: {final_size / (1024 * 1024):.2f} MB")
    print(f"Target: {args.target_mb:.2f} MB")


if __name__ == "__main__":
    main()
