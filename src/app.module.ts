import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; //para leer las variables de

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import config from './config';

const API_KEY = '1234567';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', //que lea el archivo .env
      load: [config], //para usar esto
      isGlobal: true, //para que sea global
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ], //importa los demas moulos
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ], //servicios
})
export class AppModule {}
