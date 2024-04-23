import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// import { CreateCategoriesDto } from './dto/create-categories.dto';
// import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  addCategoiresJson() {
    return this.categoriesService.addCategoires();
  }
  // @Post()
  // create(@Body() createCategoriesDto: CreateCategoriesDto) {
  //   return this.categoriesService.create(createCategoriesDto);
  // }

  // @Get()
  // findAll() {
  //   return this.categoriesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoriesDto: UpdateCategoriesDto) {
  //   return this.categoriesService.update(+id, updateCategoriesDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
