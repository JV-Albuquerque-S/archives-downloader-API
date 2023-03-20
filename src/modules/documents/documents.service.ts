import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateDocumentDto) {
    const newDoc = this.prisma.document.create({
      data
    });

    return newDoc;
  }

  async findAll() {
    const allDocs = await this.prisma.document.findMany({});
    return allDocs;
  }

  async findManyByName(name: string) {
    const ExistingDoc = await this.prisma.document.findMany({
      where: {
        name
      }
    });

    if(!ExistingDoc){
      throw new HttpException(
        `No matches with ${name}`,
        HttpStatus.NOT_FOUND
      );
    }

    return ExistingDoc;
  }

  async update(id: number, data: UpdateDocumentDto) {
    const ExistingDoc = await this.prisma.document.findUnique({
      where: {
        id
      }
    });

    if(!ExistingDoc){
      throw new HttpException(
        `Document does not exist`,
        HttpStatus.NOT_FOUND
      );
    }

    return await this.prisma.document.update({
      data,
      where: {
        id
      }
    });
  }
}
