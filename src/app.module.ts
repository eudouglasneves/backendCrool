import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [UsersModule, CategoryModule, ProductModule, SaleModule, SellerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
