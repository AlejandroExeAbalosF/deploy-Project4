import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  imgUrl: string;
}
