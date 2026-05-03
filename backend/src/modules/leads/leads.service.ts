import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadStageDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: dto,
      include: { property: true, agent: { select: { id: true, firstName: true, lastName: true } } },
    });
  }

  findAll(agentId?: string) {
    return this.prisma.lead.findMany({
      where: { ...(agentId && { agentId }) },
      include: {
        property: { select: { id: true, title: true, operation: true } },
        agent: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: { property: true, agent: true },
    });
    if (!lead) throw new NotFoundException('Lead no encontrado');
    return lead;
  }

  async updateStage(id: string, dto: UpdateLeadStageDto) {
    await this.findOne(id);
    return this.prisma.lead.update({
      where: { id },
      data: dto,
    });
  }
}
