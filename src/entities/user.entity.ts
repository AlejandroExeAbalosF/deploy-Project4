import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'text' })
  address: string;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'orders_id' })
  orders: Order[];
}
