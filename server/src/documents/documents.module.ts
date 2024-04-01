import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsService } from './services/documents.service';
import { DocumentsController } from './controller/documents.controller';
import {  } from './schemas/documents.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Document.name,
        schema: DocumentSchema,
      },
    ]),
  ],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export default class DocumentsModule {}
