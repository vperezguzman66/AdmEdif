import {
  IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OperationType, PropertyType } from '@prisma/client';

export class CreatePropertyDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  commune: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsEnum(OperationType)
  operation: OperationType;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsInt()
  bedrooms?: number;

  @IsOptional()
  @IsInt()
  bathrooms?: number;

  @IsOptional()
  @IsInt()
  parkingSpots?: number;
}
