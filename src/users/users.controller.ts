import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usuarioService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: User): Promise<User> {
    return this.usuarioService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: User): Promise<User | null> {
    return this.usuarioService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User | null> {
    return this.usuarioService.remove(Number(id));
  }
}