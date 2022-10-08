import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [ProductModule, CartModule, UserModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
