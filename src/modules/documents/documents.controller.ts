import { Controller, Get, Post, Body, Patch, Param, Res, Req } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.documentsService.findManyByName(name);
  }

  @Get('extension/:extension')
  findMany(@Param('extension') extension: string) {
    return this.documentsService.findManyByExtension(extension);
  }

  @Get('download/:id')
  async download(@Res() res, @Req() req) {
    const fileName = await this.documentsService.findById(Number(req.params.id));
    res.setHeader('Content-type', 'application/octet-stream');
    res.attachment(fileName);

    return await res.download("../"+ fileName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(+id, updateDocumentDto);
  }
}
