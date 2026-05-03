import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
