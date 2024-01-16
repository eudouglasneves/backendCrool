import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Omit<Product, 'id'> & { categoryID: number }): Promise<Product> {
    return this.productService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Product): Promise<Product | null> {
    return this.productService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product | null> {
    return this.productService.remove(Number(id));
  }
}