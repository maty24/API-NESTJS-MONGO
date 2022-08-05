import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsMongoId,
  IsOptional, // 👈 new decorator
  Min, // 👈 new decorator
  ValidateIf,
  ValidateNested, //validar en cascada , si hay una clase la va a validar como parte de ella
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from './category.dto';

//para crear y actualizar y solo sean ese tipado

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string; //readonly es solo lectura y no moificado

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {} //el update va a tomar todas las validacion y argumentos el create proucts

//para la paginacion
export class FilterProductsDto {
  // 👈 new DTO
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0) // que envie un numero positivo
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number; // 👈 new field

  @ValidateIf((params) => params.minPrice) //si existe esto va a ser obligatorio
  @IsPositive()
  maxPrice: number; // 👈 new field
}
