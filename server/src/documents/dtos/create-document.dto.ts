import { IsString, IsUUID } from 'class-validator';

export  class CreateDocumentDto {
  
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
