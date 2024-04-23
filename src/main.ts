import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logerGlobal } from './middlewares/loger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('Ecommerce API description, NestJS API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(logerGlobal);
  await app.listen(3000);
}
bootstrap();
