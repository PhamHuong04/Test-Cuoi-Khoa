import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCartsCartService } from './product_carts_cart.service';
import { ProductCartsCartController } from './product_carts_cart.controller';
import { ProductCartsCart } from './entities/product_carts_cart.entity';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartsCart]), AbilityModule],
  controllers: [ProductCartsCartController],
  providers: [ProductCartsCartService],
})
export class ProductCartsCartModule {}
