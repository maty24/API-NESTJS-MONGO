import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brand.entity';

@Schema() //que sea una tabla
export class Product extends Document {
  @Prop({ required: true }) //campo requerido
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  @Prop(
    //agrega un subdocumento es como un tipo de relacion
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>; //forma que va a resolver la relacion

  @Prop({ type: Types.ObjectId, ref: Brand.name }) // 👈 relation
  brand: Brand | Types.ObjectId; // 👈 new field
}

export const ProductSchema = SchemaFactory.createForClass(Product); //crear a partir de una clase
