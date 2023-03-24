<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descrição

Uma API que recebe as informações de um arquivo (nome, extensão, local de armazenamento) e armazena num banco de dados, bem como faz buscas dos mesmos e download dos arquivos requisitados, em um merge de PDFs (caso todos sejam PDFs), em uma pasta zipada (caso um ou mais não sejam PDFs), ou somente o arquivo (caso seja só um).

## Instalação

```bash
$ npm i
```

## Execução

```bash
# desenvolvimento
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Uso

-para inserções no banco envie na porta que você escolheu no .env requisições com o corpo no formato:

```bash
{
   "name": "nome",
   "ext": "extenção do arquivo (pdf, txt, docx)",
   "stored_in": "caminho RELATIVO em que o arquivo está localizado (ex: ../../pasta_x/pasta_y)"
}
```

-para as finalidades deste projeto, os arquivos que serão manipulados devem estar na mesma pasta em que a pasta do projeto, por exemplo:

```bash
{
   /home
      /user
          /Desktop
             /pasta_x
                /pasta_do_projeto_archives_downloader
                /arquivo_a_ser_manipulado1.pdf
                /arquivo_a_ser_manipulado2.docx
                /arquivo_a_ser_manipulado3.txt
}
```
