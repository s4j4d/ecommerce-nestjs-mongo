import { IsNotEmpty } from 'class-validator';

export class OtpDto {

    @IsNotEmpty()
    code: number;

    @IsNotEmpty()
    userNumber: string;

}
