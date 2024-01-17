import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/PrismaService';
import { Sale, Prisma } from '@prisma/client';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Sale[]> {
    return this.prisma.sale.findMany({
      include: {
        product: true,
        seller: true,
      },
    });
  }

  async findOne(id: number): Promise<Sale | null> {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        product: true,
        seller: true,
      },
    });

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    return sale;
  }

  async create(data: Prisma.SaleCreateInput): Promise<Sale> {
    return this.prisma.sale.create({
      data,
      include: {
        product: true,
        seller: true,
      },
    });
  }

  async update(id: number, data: Prisma.SaleUpdateInput): Promise<Sale | null> {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
    });

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    return this.prisma.sale.update({
      where: { id },
      data,
      include: {
        product: true,
        seller: true,
      },
    });
  }

  async delete(id: number): Promise<Sale | null> {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
    });

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    await this.prisma.sale.delete({
      where: { id },
    });

    return sale;
  }
}
