import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ProductDto } from './products.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProduct();
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: ProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }
}
