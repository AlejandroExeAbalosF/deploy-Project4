import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User, OrderDetail])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [],
})
export class OrdersModule {}
