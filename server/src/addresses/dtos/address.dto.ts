import { IsNotEmpty, IsString } from 'class-validator';

export default class AddressDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  address: string;
  
  @IsNotEmpty()
  postalCode: number
}
