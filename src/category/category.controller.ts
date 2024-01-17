import { Controller, Get, Post, Body, Param, Put, Delete, Header, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Header('Content-Range', 'categorys 0-10/100')
  async findAll(@Res() res): Promise<Category[]> {
    const category = await this.categoryService.findAll();
    const total = await this.categoryService.getTotalCategorys(); // Adicione este método ao seu service para obter o número total de usuários
    res.header('Content-Range', `categorys 0-${category.length}/${total}`);
    return res.status(200).json(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Category): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Category): Promise<Category | null> {
    return this.categoryService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.remove(Number(id));
  }
}