import { Module } from '@nestjs/common';
import { FilesCloudinaryService } from './files-cloudinary.service';
import { FilesCloudinaryController } from './files-cloudinary.controller';
import { FilesCloudinaryRepository } from './files-cloudinart.repository';
import { cloudinaryConfig } from '../config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FilesCloudinaryController],
  providers: [
    FilesCloudinaryService,
    FilesCloudinaryRepository,
    cloudinaryConfig,
  ],
})
export class FilesCloudinaryModule {}
