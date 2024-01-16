// src/usuario/usuario.service.ts
import { Injectable } from '@nestjs/common';

import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/Database/PrismaService';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}