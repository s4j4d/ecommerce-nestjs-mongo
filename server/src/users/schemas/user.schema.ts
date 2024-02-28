import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  isAdmin: boolean;

  @Prop({required:false})
  mobile:string;

  @Prop({required:false })
  isSeller: boolean

  @Prop({type:Types.ObjectId , required:false , ref:'Picture'})
  picture:Picture
}

export const UserSchema = SchemaFactory.createForClass(User);
