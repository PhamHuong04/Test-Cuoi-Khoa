import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartReposity: Repository<Cart>,
  ) {}
  create(createCartDto: CreateCartDto) {
    return this.cartReposity.save(createCartDto);
  }

  createWithoutDto(cart: Cart) {
    this.cartReposity.save(cart);
  }
}
