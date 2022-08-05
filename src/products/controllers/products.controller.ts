import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from '../../common/mongo-id.pipe'; //pipe credo por mi ;D
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products') //esta es la base de la ruta para este controller
export class ProductsController {
  constructor(private productsService: ProductsService) {} //esta es la forma e inyecta el servicio

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId') //obtener valores
  @HttpCode(HttpStatus.ACCEPTED) //personaliza el status para los endpints
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post() // 👈 New decorator
  create(@Body() payload: CreateProductDto) {
    //payload tiene su tipado
    this.productsService.create(payload);
  }
  @Put(':id') //necesitamos el identificador
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    //recivo un param y un body con la info(payload)
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
