import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll(params?: FilterProductsDto) {
    //le pongo el ? para que sean opcionales
    if (params) {
      const filters: FilterQuery<Product> = {}; //filet query de prodcutos
      const { limit, offset } = params; //saco el limit y offet
      const { minPrice, maxPrice } = params; //saco el min y max de los params
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }; //gte es mayor o igual y el lte es menor o igual,  esto es un rango
      }
      return this.productModel
        .find(filters)
        .populate('brand') //que me incuya los datos de brand
        .skip(offset)
        .limit(limit)
        .exec(); //le pongo el filter en find
    }
    return this.productModel.find().populate('brand').exec(); //exec es que ejecuta el query
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id); //en product model es la inteaccion cpn la tabla
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  create(data: CreateProductDto) {
    // 👈
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  update(id: string, changes: UpdateProductDto) {
    // 👈
    const product = this.productModel
      //set solo actualize esa parte y new que muestre la nueva y borre el antiguo
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    // 👈
    return this.productModel.findByIdAndDelete(id);
  }
}
