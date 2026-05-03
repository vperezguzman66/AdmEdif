import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('buildings')
export class BuildingsController {
  constructor(private buildingsService: BuildingsService) {}

  @Roles(Role.SUPER_ADMIN, Role.BUILDING_ADMIN)
  @Post()
  create(@Body() dto: CreateBuildingDto) {
    return this.buildingsService.create(dto);
  }

  @Get()
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.BUILDING_ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBuildingDto) {
    return this.buildingsService.update(id, dto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(id);
  }
}
