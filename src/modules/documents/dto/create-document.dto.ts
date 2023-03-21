import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDocumentDto {

    @IsNumber()
    id: number;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(10)
    ext: string;

    @IsString()
    @MinLength(2)
    @MaxLength(150)
    stored_in: string;

    @IsString()
    created_at: string;
}
