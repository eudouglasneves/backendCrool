import { Controller, Get, Post, Body, Param, Put, Delete, Header, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Header('Content-Range', 'products 0-10/100')
  async findAll(@Res() res): Promise<Product[]> {
    const product = await this.productService.findAll();
    const total = await this.productService.getTotalProducts(); // Adicione este método ao seu service para obter o número total de usuários
    res.header('Content-Range', `products 0-${product.length}/${total}`);
    return res.status(200).json(product);
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