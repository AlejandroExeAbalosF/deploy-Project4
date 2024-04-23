import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EjemploService } from './ejemplo.service';
import { CreateEjemploDto } from './dto/create-ejemplo.dto';
import { UpdateEjemploDto } from './dto/update-ejemplo.dto';

@Controller('ejemplo')
export class EjemploController {
  constructor(private readonly ejemploService: EjemploService) {}

  @Post()
  create(@Body() createEjemploDto: CreateEjemploDto) {
    return this.ejemploService.create(createEjemploDto);
  }

  @Get()
  findAll() {
    return this.ejemploService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejemploService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjemploDto: UpdateEjemploDto) {
    return this.ejemploService.update(+id, updateEjemploDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejemploService.remove(+id);
  }
}
