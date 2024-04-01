import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateDocumentDto  } from '../dtos';
import { DocumentsService } from '../services/documents.service';

@Controller('pictures')
export default class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  getDocuments(
    @Query('keyword') keyword: string,
    @Query('pageId') pageId: string
  ) {
    return this.documentsService.findMany(keyword, pageId);
  }

  @Get('topRated')
  getTopRatedDocuments() {
    return this.documentsService.findTopRated();
  }

  @Get(':id')
  getDocument(@Param('id') id: string) {
    return this.documentsService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.documentsService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  createDocument(data:CreateDocumentDto) {
    return this.documentsService.createSample();
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateDocument(@Param('id') id: string, @Body() product: DocumentDto) {
    return this.documentsService.update(id, product);
  }

  @UseGuards(AuthGuard)
  @Put(':id/review')
  createReview(
    @Param('id') id: string,
    @Body() { rating, comment }: ReviewDto,
    @Session() session: any
  ) {
    return this.documentsService.createReview(id, session.user, rating, comment);
  }
}
