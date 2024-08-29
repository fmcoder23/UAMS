import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDocumentDto: CreateDocumentDto, creatorId: string) {
    const { userId } = createDocumentDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Find the creator's name
    const creator = await this.prisma.user.findUnique({ where: { id: creatorId } });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${creatorId} not found`);
    }

    const document = await this.prisma.document.create({
      data: {
        ...createDocumentDto,
        createdBy: creator.fullname,
      },
    });

    return formatResponse('Document created successfully', document);
  }

  async findAll() {
    const documents = await this.prisma.document.findMany({
      where: { deletedAt: null },
      include: { user: true },
    });
    return formatResponse('Documents retrieved successfully', documents);
  }

  async findMe(userId: string) {
    const documents = await this.prisma.document.findMany({
      where: { userId, deletedAt: null },
    });

    if (documents.length === 0) {
      throw new NotFoundException(`No documents found for user ID ${userId}`);
    }

    return formatResponse('User documents retrieved successfully', documents);
  }

  async findOne(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id, deletedAt: null },
      include: { user: true },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return formatResponse('Document retrieved successfully', document);
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.prisma.document.findUnique({
      where: { id, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    const updatedDocument = await this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
    });

    return formatResponse('Document updated successfully', updatedDocument);
  }

  async remove(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    await this.prisma.document.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Document deleted successfully', null);
  }
}
