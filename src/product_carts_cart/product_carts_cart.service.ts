import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCartsCart } from './entities/product_carts_cart.entity';

@Injectable()
export class ProductCartsCartService {
  constructor(
    @InjectRepository(ProductCartsCart)
    private readonly cartProduct: Repository<ProductCartsCart>,
  ) {}

  addProductToCart(cartId: number, productId: number) {
    return this.cartProduct.save({
      cartId,
      productId,
    });
  }

  async getAllProductsInCart(cartId: number) {
    const data = await this.cartProduct.find({
      where: {
        cart: {
          id: cartId,
        },
      },
      relations: ['cart', 'product'],
    });
    return [...data];
  }
}
