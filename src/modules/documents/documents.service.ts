import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { PDFDocument } from 'pdf-lib';
//import fs from 'fs';
//const merge = require('easy-pdf-merge');
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

  async findManyByExtension(ext: string) {
    const ExistingDoc = await this.prisma.document.findMany({
      where: {
        ext
      }
    });

    if(!ExistingDoc){
      throw new HttpException(
        `No matches with ${ext}`,
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

  async findById(id: number) {
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

    /*erge(['../Merge1.pdf', '../Merge2.pdf'], '../Merged.pdf', function (err) {
      if (err) {
          return console.log(err)
      }
      console.log('Successfully merged!')
    });*/

    return ExistingDoc.name;
  }
}
