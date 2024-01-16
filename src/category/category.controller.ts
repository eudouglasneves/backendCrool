import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
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