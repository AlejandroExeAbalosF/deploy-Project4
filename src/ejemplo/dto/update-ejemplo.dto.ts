import { PartialType } from '@nestjs/swagger';
import { CreateEjemploDto } from './create-ejemplo.dto';

export class UpdateEjemploDto extends PartialType(CreateEjemploDto) {}
