import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productoRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getOrder(id: string) {
    return await this.orderRepository.findOne({
      where: { id: id },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }

  async addOrder(id: string, products: Array<any>) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) {
      throw new NotFoundException('User Not Found');
    }
    let acum: number = 0;
    const producState = [];
    for (const elem of products) {
      const product = await this.productoRepository.findOneBy({
        id: elem.id,
      });
      if (product) {
        if (Number(product.stock) > 0) {
          acum += Number(product.price);
          product.stock = Number(product.stock) - 1;
          await this.productoRepository.save(product);
          producState.push({ id: elem.id });
        }
      }
    }

    if (!producState.length) {
      return 'Stock or Products not available';
    }
    // return productValidate;
    console.log(producState);
    const newOrder = new Order();
    newOrder.date = new Date();
    newOrder.user = userFound;
    const order = await this.orderRepository.save(newOrder);

    const newOrderDetail = new OrderDetail();
    newOrderDetail.order = order;
    newOrderDetail.price = Number(Number(acum).toFixed(2));
    newOrderDetail.products = producState;
    await this.orderDetailRepository.save(newOrderDetail);

    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }
}
