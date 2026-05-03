import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { UnitType } from '@prisma/client';

export class CreateUnitDto {
  @IsNotEmpty()
  number: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  floor?: number;

  @IsEnum(UnitType)
  @IsOptional()
  type?: UnitType;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsString()
  parkingSpot?: string;

  @IsNotEmpty()
  buildingId: string;

  @IsOptional()
  ownerId?: string;
}
