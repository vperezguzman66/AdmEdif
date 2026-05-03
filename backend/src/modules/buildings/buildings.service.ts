import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBuildingDto) {
    return this.prisma.building.create({ data: dto });
  }

  findAll() {
    return this.prisma.building.findMany({
      where: { isActive: true },
      include: { _count: { select: { units: true } } },
    });
  }

  async findOne(id: string) {
    const building = await this.prisma.building.findUnique({
      where: { id },
      include: { units: { where: { isActive: true } } },
    });
    if (!building) throw new NotFoundException('Edificio no encontrado');
    return building;
  }

  async update(id: string, dto: UpdateBuildingDto) {
    await this.findOne(id);
    return this.prisma.building.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.building.update({ where: { id }, data: { isActive: false } });
  }
}
