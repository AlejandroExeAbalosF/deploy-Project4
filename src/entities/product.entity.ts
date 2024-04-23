import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './category.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    default: 'https://i.ebayimg.com/images/g/JfkAAOSwI4pWtM9~/s-l1600.jpg',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
