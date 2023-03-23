import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import fs from 'fs';
const merge = require('easy-pdf-merge');
const fs = require('fs');
const AdmZip = require('adm-zip');
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

  async findById(id) {
    //transforma o obj em uma array dos seus valores
    let array = Object.values(id);

    let filesPath = [];

    //console.log(array)
    let count = 0

    //roda todos os valores, se tiver algum que não seja pdf
    //soma count pra checar se tem que fazer merge ou pasta
    //.zip, se tiver algum id que não exista já retorna erro
    //e se for só um elemento no array já retorna o nome do
    //arquivo
    for(let i=0; i<array.length; i++){
      let j = Number(array[i])
      const singleDoc = await this.prisma.document.findUnique({
        where: {
          id: j
        }
      });
      if(!singleDoc){
        throw new HttpException(
          `Document does not exist`,
          HttpStatus.NOT_FOUND
        );
      }
      filesPath.push(`../${singleDoc.name}`)
      if(array.length===1) return singleDoc.name
      if(singleDoc.ext !== 'pdf') count++
    }

    if(count===0){
      merge(filesPath, '../Merged.pdf', function (err){
        if(err) {
          return console.log(err);
        }
        console.log(`${filesPath} successfully merged!`)
      })  
    }
    //console.log(count)

    /*const ExistingDoc = await this.prisma.document.findUnique({
      where: {
        id: 1
      }
    });

    if(!ExistingDoc){
      throw new HttpException(
        `Document does not exist`,
        HttpStatus.NOT_FOUND
      );
    }*/

    return 'Merged.pdf';
  }
}
