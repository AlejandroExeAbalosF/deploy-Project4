import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

import * as data from '../../data.json';
import { InjectRepository } from '@nestjs/typeorm';

type IProduct = {
  id: number;

  name: string;

  description: string;

  price: number;

  stock: boolean;

  imgUrl: string;
};

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productoRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getProducts() {
    return this.productoRepository.find({
      relations: { category: true },
    });
    return;
  }

  async addProduct() {
    data?.map(async (elem) => {
      const category = await this.categoryRepository.findOneBy({
        name: elem.category,
      });
      await this.productoRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values({
          name: elem.name,
          description: elem.description,
          price: elem.price,
          stock: elem.stock,
          imgUrl: elem.imgUrl,
          category: category,
        })
        .orIgnore()
        .execute();
    });

    return 'Products added successfully';
  }

  async updateProduct(id: string, product: Partial<Product>) {
    console.log(id);
    const productE = await this.productoRepository.findOneBy({ id: id });

    if (!productE) {
      throw new NotFoundException('Product not found');
    }
    console.log(productE);
    return await this.productoRepository
      .createQueryBuilder()
      .update(productE)
      .set(product)
      .execute();
  }
}
