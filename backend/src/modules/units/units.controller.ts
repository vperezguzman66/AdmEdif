import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('units')
export class UnitsController {
  constructor(private unitsService: UnitsService) {}

  @Roles(Role.SUPER_ADMIN, Role.BUILDING_ADMIN)
  @Post()
  create(@Body() dto: CreateUnitDto) {
    return this.unitsService.create(dto);
  }

  @Get('building/:buildingId')
  findByBuilding(@Param('buildingId') buildingId: string) {
    return this.unitsService.findByBuilding(buildingId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsService.remove(id);
  }
}
