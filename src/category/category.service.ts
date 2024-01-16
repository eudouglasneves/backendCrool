import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/PrismaService';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category | null> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Category | null> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}