import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/PrismaService';
import { Seller, Prisma } from '@prisma/client';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Seller[]> {
    return this.prisma.seller.findMany();
  }

  async findOne(id: number): Promise<Seller | null> {
    return this.prisma.seller.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.SellerCreateInput): Promise<Seller> {
    return this.prisma.seller.create({
      data,
    });
  }

  async update(id: number, data: Prisma.SellerUpdateInput): Promise<Seller | null> {
    return this.prisma.seller.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Seller | null> {
    return this.prisma.seller.delete({
      where: { id },
    });
  }
  
  async getTotalSellers(): Promise<number> {
    return this.prisma.seller.count();
  }


}