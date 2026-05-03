import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadStageDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Roles(Role.SUPER_ADMIN, Role.AGENT)
  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Roles(Role.SUPER_ADMIN, Role.AGENT)
  @Get()
  findAll(@Query('agentId') agentId: string, @CurrentUser() user: any) {
    const filterAgent = user.role === Role.AGENT ? user.id : agentId;
    return this.leadsService.findAll(filterAgent);
  }

  @Roles(Role.SUPER_ADMIN, Role.AGENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.AGENT)
  @Patch(':id/stage')
  updateStage(@Param('id') id: string, @Body() dto: UpdateLeadStageDto) {
    return this.leadsService.updateStage(id, dto);
  }
}
