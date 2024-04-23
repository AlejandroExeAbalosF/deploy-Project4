import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false, length: 50, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];
}
