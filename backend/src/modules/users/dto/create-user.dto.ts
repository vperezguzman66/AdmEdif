import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
