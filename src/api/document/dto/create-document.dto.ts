import { ApiProperty } from "@nestjs/swagger";
import { DocumentType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDocumentDto {
    @ApiProperty({ description: 'Type of the document', enum: DocumentType, example: DocumentType.PASSPORT })
    @IsEnum(DocumentType)
    @IsNotEmpty()
    type: DocumentType;
  
    @ApiProperty({ description: 'File path or URL to the document', example: 'file.jpg' })
    @IsString()
    @IsNotEmpty()
    upload: string;
  
    @ApiProperty({ description: 'ID of the user associated with the document', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
  }