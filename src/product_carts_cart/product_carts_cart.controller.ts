import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { Action } from 'src/ability/ability.factory';
import { ProductCartsCartService } from './product_carts_cart.service';
import { User as UserEntity } from 'src/user/entities/user.entity';

@Controller('')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@CheckAbilities({ action: Action.MANAGE_USER, subject: UserEntity })
export class ProductCartsCartController {
  constructor(
    private readonly productCartsCartService: ProductCartsCartService,
  ) {}

  @Post('add-product-to-cart/:cartId')
  addUserToProject(
    @Param('cartId') cartId: number,
    @Body('productId') productId: number,
  ) {
    return this.productCartsCartService.addProductToCart(cartId, productId);
  }

  @Get('list-all-products-in-cart/:cartId')
  getAllProductsInCart(@Param('cartId') cartId: number) {
    return this.productCartsCartService.getAllProductsInCart(cartId);
  }
}
