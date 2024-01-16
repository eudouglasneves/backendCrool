import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsuarioController } from './users.controller';
import { PrismaService } from 'src/Database/PrismaService';

@Module({
  controllers: [UsuarioController],
  providers: [UserService, PrismaService],
})
export class UsersModule {}
