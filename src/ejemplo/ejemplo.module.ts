import { Module } from '@nestjs/common';
import { EjemploService } from './ejemplo.service';
import { EjemploController } from './ejemplo.controller';

@Module({
  controllers: [EjemploController],
  providers: [EjemploService],
})
export class EjemploModule {}
