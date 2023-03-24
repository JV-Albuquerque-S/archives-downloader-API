import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const merge = require('easy-pdf-merge');
const fs = require('fs');
const path = require("path");
var archiver = require('archiver');
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
      });
      return 'Merged.pdf';
    }

    if(count>0){
      fs.rmdir("../all_files",
      { recursive: true, force: true }, (err) => {
        if (err) {
          return console.log("error occurred in deleting directory", err);
        }
        console.log("Directory deleted successfully");
      });
      fs.rmdir("../n_all_files.zip",
      { recursive: true, force: true }, (err) => {
        if (err) {
          return console.log("error occurred in deleting directory", err);
        }
        console.log("Directory deleted successfully");
      });

      setTimeout(() => {fs.mkdirSync(path.join('../', "all_files"));}, 500);
      setTimeout(() => {
        for(let i=0; i<filesPath.length; i++){
          fs.copyFileSync(filesPath[i], `../all_files/copied${filesPath[i].substring(3)}`);
        }
      }, 500);

      setTimeout(() => {
        var output = fs.createWriteStream('../n_all_files.zip');
        var archive = archiver('zip');
  
        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });
  
        archive.on('error', function(err){
            throw err;
        });
  
        archive.pipe(output);
  
        archive.directory('../all_files', false);
  
        archive.finalize();
      }, 500);

      return 'n_all_files.zip'
    }
  }
}
