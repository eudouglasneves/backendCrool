import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaService } from 'src/Database/PrismaService';

@Module({
  controllers: [SellerController],
  providers: [SellerService, PrismaService],
})
export class SellerModule {}
