import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';
import { Product } from '../../products/entities/product.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId; // uno a uno

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] }) //es un arrays de ids
  products: Types.Array<Product>; //es un array de product
}

export const OrderSchema = SchemaFactory.createForClass(Order);
