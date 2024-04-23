import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'order_details_products' })
  products: Product[];

  @OneToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
