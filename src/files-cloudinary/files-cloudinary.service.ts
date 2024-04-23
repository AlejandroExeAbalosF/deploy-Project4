import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesCloudinaryRepository } from './files-cloudinart.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesCloudinaryService {
  constructor(
    private readonly filesCloudinaryRepository: FilesCloudinaryRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const uploadedImage =
      await this.filesCloudinaryRepository.uploadImage(file);

    await this.productRepository.update(product.id, {
      imgUrl: uploadedImage.secure_url,
    });
    const productUpdated = await this.productRepository.findOneBy({
      id: product.id,
    });

    return productUpdated;
  }
}
