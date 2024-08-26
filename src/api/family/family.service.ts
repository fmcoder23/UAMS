import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatResponse } from 'src/common/utils/response.util';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFamilyDto: CreateFamilyDto, userId: string) {
    const family = await this.prisma.family.create({
      data: {
        ...createFamilyDto,
        userId,
      },
    });
    return formatResponse('Family information created successfully', family);
  }

  async findAll() {
    const families = await this.prisma.family.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
      },
    });
    return formatResponse('Families retrieved successfully', families);
  }

  async findMe(userId: string) {
    const family = await this.prisma.family.findUnique({
      where: { userId, deletedAt: null },
      include: {
        user: true,
      },
    });

    if (!family) {
      throw new NotFoundException(`Family information for user ID ${userId} not found`);
    }

    return formatResponse('Family information retrieved successfully', family);
  }

  async findOne(id: string, userId: string, userRole: Role) {
    const family = await this.prisma.family.findUnique({
      where: { id, deletedAt: null },
      include: {
        user: true,
      },
    });

    if (!family) {
      throw new NotFoundException(`Family information with ID ${id} not found`);
    }

    if (family.userId !== userId && userRole === Role.USER) {
      throw new ForbiddenException('You can only access your own family information');
    }

    return formatResponse('Family information retrieved successfully', family);
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto, userId: string, userRole: Role) {
    const family = await this.prisma.family.findUnique({
      where: { id, deletedAt: null },
    });

    if (!family) {
      throw new NotFoundException(`Family information with ID ${id} not found`);
    }

    if (family.userId !== userId && userRole === Role.USER) {
      throw new ForbiddenException('You can only update your own family information');
    }

    const updatedFamily = await this.prisma.family.update({
      where: { id },
      data: { ...updateFamilyDto },
    });

    return formatResponse('Family information updated successfully', updatedFamily);
  }

  async remove(id: string) {
    const family = await this.prisma.family.findUnique({
      where: { id, deletedAt: null },
    });

    if (!family) {
      throw new NotFoundException(`Family information with ID ${id} not found`);
    }

    const deletedFamily = await this.prisma.family.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Family information deleted successfully', null);
  }
}
