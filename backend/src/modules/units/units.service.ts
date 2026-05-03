import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUnitDto) {
    return this.prisma.unit.create({ data: dto });
  }

  findByBuilding(buildingId: string) {
    return this.prisma.unit.findMany({
      where: { buildingId, isActive: true },
      include: { residents: { where: { isActive: true }, include: { user: true } } },
    });
  }

  async findOne(id: string) {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
      include: {
        building: true,
        owner: true,
        residents: { where: { isActive: true }, include: { user: true } },
      },
    });
    if (!unit) throw new NotFoundException('Unidad no encontrada');
    return unit;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.unit.update({ where: { id }, data: { isActive: false } });
  }
}
