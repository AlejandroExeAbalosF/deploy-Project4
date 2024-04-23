import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

import * as data from '../../data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getCategories() {
    return this.categoriesRepository.find();
  }
  async addCategories() {
    data?.map(async (elem) => {
      console.log(elem);
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: elem.category })
        .orIgnore()
        .execute();
    });
    return 'Categories added successfully';
  }
}
