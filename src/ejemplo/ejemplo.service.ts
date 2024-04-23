import { Injectable } from '@nestjs/common';
import { CreateEjemploDto } from './dto/create-ejemplo.dto';
import { UpdateEjemploDto } from './dto/update-ejemplo.dto';

@Injectable()
export class EjemploService {
  create(createEjemploDto: CreateEjemploDto) {
    return 'This action adds a new ejemplo';
  }

  findAll() {
    return `This action returns all ejemplo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejemplo`;
  }

  update(id: number, updateEjemploDto: UpdateEjemploDto) {
    return `This action updates a #${id} ejemplo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejemplo`;
  }
}
