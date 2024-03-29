import { IsString, IsNumber, IsDate } from 'class-validator';
import {Type} from 'class-transformer'

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  brand: string;

  @IsString()
  category: string;

  @IsNumber()
  countInStock: number;

  @IsDate()
  @Type(()=>Date)
  createDate:Date
}
