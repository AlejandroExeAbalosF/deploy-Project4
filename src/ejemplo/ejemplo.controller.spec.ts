import { Test, TestingModule } from '@nestjs/testing';
import { EjemploController } from './ejemplo.controller';
import { EjemploService } from './ejemplo.service';

describe('EjemploController', () => {
  let controller: EjemploController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjemploController],
      providers: [EjemploService],
    }).compile();

    controller = module.get<EjemploController>(EjemploController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
