import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class ArchiveService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArchiveDto: CreateArchiveDto, creatorId: string) {
    const { userId } = createArchiveDto;

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

    // Create the archive entry
    const archive = await this.prisma.archive.create({
      data: {
        ...createArchiveDto,
        createdBy: creator.fullname,
      },
    });

    // Update the user's deletedAt field
    await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Archive entry created successfully, and user marked as deleted', archive);
  }

  async findAll() {
    const archives = await this.prisma.archive.findMany({
      include: {
        user: true,
      }
    });
    return formatResponse('Archives retrieved successfully', archives);
  }

  async findOne(id: string) {
    const archive = await this.prisma.archive.findUnique({
      where: { id },
      include: {
        user: true,
      }
    });
    if (!archive) {
      throw new NotFoundException(`Archive entry with ID ${id} not found`);
    }
    return formatResponse('Archive entry retrieved successfully', archive);
  }

  async update(id: string, updateArchiveDto: UpdateArchiveDto) {
    const archive = await this.prisma.archive.findUnique({
      where: { id },
    });
    if (!archive) {
      throw new NotFoundException(`Archive entry with ID ${id} not found`);
    }

    const updatedArchive = await this.prisma.archive.update({
      where: { id },
      data: updateArchiveDto,
    });

    return formatResponse('Archive entry updated successfully', updatedArchive);
  }

  async remove(id: string) {
    const archive = await this.prisma.archive.findUnique({
      where: { id },
    });
    if (!archive) {
      throw new NotFoundException(`Archive entry with ID ${id} not found`);
    }

    await this.prisma.archive.delete({
      where: { id },
    });

    return formatResponse('Archive entry deleted successfully', null);
  }
}
