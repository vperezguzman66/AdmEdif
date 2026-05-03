import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBuildingDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  commune!: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  totalUnits!: number;
}
