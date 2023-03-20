import { Controller, Get, Post, Body, Patch, Param, Res } from '@nestjs/common';
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

  /*@Get(':name')
  findOne(@Param('name') name: string) {
    return this.documentsService.findManyByName(name);
  }*/

  @Get('download')
  download(@Res() res) {
    const fileName = 'Sistema Integrado de Gestão de Atividades Acadêmicas.pdf';
    res.setHeader('Content-type', 'application/octet-stream');
    res.attachment(fileName);
    return res.download("../"+ fileName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(+id, updateDocumentDto);
  }
}
