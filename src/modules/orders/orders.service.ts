import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
// import { CreateOrdersDto } from './dto/create-orders.dto';
// import { UpdateOrdersDto } from './dto/update-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOreder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
  addOrder(id: string, products: Array<any>) {
    return this.ordersRepository.addOrder(id, products);
  }
  // create(createOrdersDto: CreateOrdersDto) {
  //   return 'This action adds a new orders';
  // }
  // findAll() {
  //   return `This action returns all orderss`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #id orders`;
  // }
  // update(id: number, updateOrdersDto: UpdateOrdersDto) {
  //   return `This action updates a #id orders`;
  // }
  // remove(id: number) {
  //   return `This action removes a #id orders`;
  // }
}
