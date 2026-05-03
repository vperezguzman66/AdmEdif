import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePropertyDto) {
    return this.prisma.property.create({ data: dto });
  }

  findAll(operation?: string, city?: string) {
    return this.prisma.property.findMany({
      where: {
        isActive: true,
        status: PropertyStatus.AVAILABLE,
        ...(operation && { operation: operation as any }),
        ...(city && { city }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) throw new NotFoundException('Propiedad no encontrada');
    return property;
  }

  async updateStatus(id: string, status: PropertyStatus) {
    await this.findOne(id);
    return this.prisma.property.update({ where: { id }, data: { status } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.property.update({ where: { id }, data: { isActive: false } });
  }
}
