import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { FilesCloudinaryService } from './files-cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('files')
export class FilesCloudinaryController {
  constructor(
    private readonly filesCloudinaryService: FilesCloudinaryService,
  ) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) producId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000, // 2MB
            message: 'File is to large',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.filesCloudinaryService.uploadImage(file, producId);
  }
}
