import { Controller, Get, Post, Body, Param, Put, Delete, Res, Header } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UserService) {}

  @Get()
  @Header('Content-Range', 'users 0-10/100') // Atualize com os valores corretos
  async findAll(@Res() res): Promise<User[]> {
    const users = await this.usuarioService.findAll();
    const total = await this.usuarioService.getTotalUsers(); // Adicione este método ao seu service para obter o número total de usuários
    res.header('Content-Range', `users 0-${users.length}/${total}`);
    return res.status(200).json(users);
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