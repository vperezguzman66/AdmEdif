import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('El email ya está registrado');

    const hashed = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.create({
      data: { ...dto, password: hashed },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, phone: true },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async deactivate(id: string) {
    return this.prisma.user.update({ where: { id }, data: { isActive: false } });
  }
}
