import { Controller, Get, Post, Put, Delete, Body, Param, Header, Res } from '@nestjs/common';
import { SaleService } from './sale.service';
import { Sale, Prisma } from '@prisma/client';

@Controller('sales')
export class SaleController {
  constructor(private readonly salesService: SaleService) {}

  @Get()
  @Header('Content-Range', 'sales 0-10/100')
  async findAll(@Res() res): Promise<Sale[]> {
    const sale = await this.salesService.findAll();
    const total = await this.salesService.getTotalSales(); // Adicione este método ao seu service para obter o número total de usuários
    res.header('Content-Range', `sales 0-${sale.length}/${total}`);
    return res.status(200).json(sale);
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