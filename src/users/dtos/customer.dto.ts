import { IsString, IsNotEmpty, IsPhoneNumber, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  readonly skills: any; //ya le valido que sea un array
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
