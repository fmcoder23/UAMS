import { ApiProperty } from "@nestjs/swagger";
import { DocumentType } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateDocumentDto {
    @ApiProperty({ description: 'Type of the document', enum: DocumentType, example: DocumentType.PASSPORT })
    @IsEnum(DocumentType)
    @IsOptional()
    type?: DocumentType;
  
    @ApiProperty({ description: 'File path or URL to the document', example: 'http://example.com/file.jpg' })
    @IsString()
    @IsOptional()
    upload?: string;
  }