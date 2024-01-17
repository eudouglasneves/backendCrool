import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SellerService } from './seller.service';
import { Seller } from '@prisma/client';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
  @Get()
  findAll(): Promise<Seller[]> {
    return this.sellerService.findAll();
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

