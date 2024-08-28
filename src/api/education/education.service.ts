import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { formatResponse } from 'src/common/utils/response.util';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEducationDto: CreateEducationDto, userId: string) {
    await this.ensureEducationDoesNotExist(userId);

    const education = await this.prisma.education.create({
      data: {
        ...createEducationDto,
        userId,
      },
    });
    return formatResponse('Education created successfully', education);
  }

  async findAll() {
    const educations = await this.prisma.education.findMany({
      where: { deletedAt: null },
    });
    return formatResponse('Educations retrieved successfully', educations);
  }

  async findMe(userId: string) {
    const education = await this.prisma.education.findUnique({
      where: { userId, deletedAt: null },
    });

    if (!education) {
      throw new NotFoundException(`Education record for user ID ${userId} not found`);
    }

    return formatResponse('Education retrieved successfully', education);
  }

  async findOne(id: string, userId: string, userRole: Role) {
    const education = await this.prisma.education.findUnique({
      where: { id, deletedAt: null },
    });

    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }

    if (education.userId !== userId && userRole === Role.USER) {
      throw new ForbiddenException('You can only access your own education records');
    }

    return formatResponse('Education retrieved successfully', education);
  }

  async update(id: string, updateEducationDto: UpdateEducationDto, userId: string, userRole: Role) {
    const education = await this.prisma.education.findUnique({
      where: { id, deletedAt: null },
    });

    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }

    if (education.userId !== userId && userRole === Role.USER) {
      throw new ForbiddenException('You can only update your own education records');
    }

    const updatedEducation = await this.prisma.education.update({
      where: { id },
      data: updateEducationDto,
    });

    return formatResponse('Education updated successfully', updatedEducation);
  }

  async remove(id: string) {
    const education = await this.prisma.education.findUnique({
      where: { id, deletedAt: null },
    });

    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }

    const deletedEducation = await this.prisma.education.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Education deleted successfully', null);
  }

  // Private helper methods

  private async ensureEducationDoesNotExist(userId: string) {
    const existingEducation = await this.prisma.education.findUnique({
      where: { userId },
    });
    if (existingEducation) {
      throw new ConflictException('Education record already exists for this user');
    }
  }
}
