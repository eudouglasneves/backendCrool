import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SaleService } from './sale.service';
import { Sale, Prisma } from '@prisma/client';

@Controller('sales')
export class SaleController {
  constructor(private readonly salesService: SaleService) {}

  @Get()
  getAllSales(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  @Get(':id')
  getSaleById(@Param('id') id: string): Promise<Sale | null> {
    return this.salesService.findOne(Number(id));
  }

  @Post()
  createSale(@Body() data: Prisma.SaleCreateInput): Promise<Sale> {
    return this.salesService.create(data);
  }

  @Put(':id')
  updateSale(@Param('id') id: string, @Body() data: Prisma.SaleUpdateInput): Promise<Sale | null> {
    return this.salesService.update(Number(id), data);
  }

  @Delete(':id')
  deleteSale(@Param('id') id: string): Promise<Sale | null> {
    return this.salesService.delete(Number(id));
  }
}