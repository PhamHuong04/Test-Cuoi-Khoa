import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';
import { Product } from './entities/product.entity';

@Controller('product')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @CheckAbilities({ action: Action.MANAGE_PRODUCT, subject: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.MANAGE_PRODUCT, subject: Product })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.MANAGE_PRODUCT, subject: Product })
  remove(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
