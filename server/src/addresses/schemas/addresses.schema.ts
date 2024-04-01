import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: false })
  name:string;

  @Prop({ required: true })
  city:string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  address: string;

  @Prop({required:true})
  postalCode:number
}

export const AddressSchema = SchemaFactory.createForClass(Address);
