import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/PrismaService';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true, // Inclui os dados da categoria relacionada
      },
    });
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async create(data: Omit<Prisma.ProductCreateInput, 'category'> & { categoryID: number }): Promise<Product> {
    const { categoryID, ...productData } = data;

    return this.prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: { id: categoryID },
        },
      },
      include: {
        category: true,
      },
    });
  }

  async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product | null> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  async remove(id: number): Promise<Product | null> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
