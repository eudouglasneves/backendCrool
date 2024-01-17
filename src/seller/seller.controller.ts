import { Controller, Get, Post, Body, Param, Put, Delete, Header, Res } from '@nestjs/common';
import { SellerService } from './seller.service';
import { Seller } from '@prisma/client';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
  @Get()
  @Header('Content-Range', 'sellers 0-10/100')
  async findAll(@Res() res): Promise<Seller[]> {
    const sellers = await this.sellerService.findAll();
    const total = await this.sellerService.getTotalSellers(); // Adicione este método ao seu service para obter o número total de usuários
    res.header('Content-Range', `sellers 0-${sellers.length}/${total}`);
    return res.status(200).json(sellers);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Seller | null> {
    return this.sellerService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Seller): Promise<Seller> {
    return this.sellerService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Seller): Promise<Seller | null> {
    return this.sellerService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Seller | null> {
    return this.sellerService.remove(Number(id));
  }
}

