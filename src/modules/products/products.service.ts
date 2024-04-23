import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDto } from './products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }

  addProduct() {
    return this.productsRepository.addProduct();
  }

  updateProduct(id: string, product: Partial<ProductDto>) {
    return this.productsRepository.updateProduct(id, product);
  }
}
