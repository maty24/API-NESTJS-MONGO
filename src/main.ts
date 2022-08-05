import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Eliminar los parámetros recibidos que no estén definidos en los DTO
      forbidNonWhitelisted: true, //Informar a la API que se está enviando un atributo no válido
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  ); //usar la validacion de los pipes global
  await app.listen(8080);
}
bootstrap();
