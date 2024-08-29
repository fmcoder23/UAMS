import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class TranslationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTranslationDto: CreateTranslationDto, creatorId: string) {
    const { userId, ...rest } = createTranslationDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Fetch the creator's name
    const creator = await this.prisma.user.findUnique({ where: { id: creatorId } });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${creatorId} not found`);
    }

    const translation = await this.prisma.translation.create({
      data: {
        ...rest,
        userId,
        createdBy: creator.fullname,
      },
    });

    return formatResponse('Translation created successfully', translation);
  }

  async findAll() {
    const translations = await this.prisma.translation.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
      },
    });
    return formatResponse('Translations retrieved successfully', translations);
  }

  async findMe(userId: string) {
    const translations = await this.prisma.translation.findMany({
      where: { userId, deletedAt: null },
    });
    if (translations.length === 0) {
      throw new NotFoundException(`No translations found for user ID ${userId}`);
    }
    return formatResponse('User translations retrieved successfully', translations);
  }

  async findOne(id: string) {
    const translation = await this.prisma.translation.findUnique({
      where: { id, deletedAt: null },
      include: {
        user: true,
      },
    });
    if (!translation) {
      throw new NotFoundException(`Translation with ID ${id} not found`);
    }
    return formatResponse('Translation retrieved successfully', translation);
  }

  async update(id: string, updateTranslationDto: UpdateTranslationDto) {
    const translation = await this.prisma.translation.findUnique({
      where: { id, deletedAt: null },
    });
    if (!translation) {
      throw new NotFoundException(`Translation with ID ${id} not found`);
    }

    const updatedTranslation = await this.prisma.translation.update({
      where: { id },
      data: updateTranslationDto,
    });

    return formatResponse('Translation updated successfully', updatedTranslation);
  }

  async remove(id: string) {
    const translation = await this.prisma.translation.findUnique({
      where: { id, deletedAt: null },
    });
    if (!translation) {
      throw new NotFoundException(`Translation with ID ${id} not found`);
    }

    await this.prisma.translation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Translation deleted successfully', null);
  }
}
