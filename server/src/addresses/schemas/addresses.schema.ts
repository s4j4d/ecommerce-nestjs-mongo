import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);
