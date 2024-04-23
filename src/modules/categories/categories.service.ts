import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
// import { CreateCategoriesDto } from './dto/create-categories.dto';
// import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  addCategoires() {
    return this.categoriesRepository.addCategories();
  }
  // create(createCategoriesDto: CreateCategoriesDto) {
  //   return 'This action adds a new categories';
  // }
  // findAll() {
  //   return `This action returns all categoriess`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #id categories`;
  // }
  // update(id: number, updateCategoriesDto: UpdateCategoriesDto) {
  //   return `This action updates a #id categories`;
  // }
  // remove(id: number) {
  //   return `This action removes a #id categories`;
  // }
}
