import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeadStage } from '@prisma/client';

export class CreateLeadDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  propertyId?: string;

  @IsOptional()
  agentId?: string;
}

export class UpdateLeadStageDto {
  @IsEnum(LeadStage)
  stage: LeadStage;

  @IsOptional()
  @IsString()
  notes?: string;
}
