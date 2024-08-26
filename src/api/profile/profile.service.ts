import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatResponse } from 'src/common/utils/response.util';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto, userId: string) {
    const profile = await this.prisma.profile.create({
      data: {
        ...createProfileDto,
        userId,
      },
    });
    return formatResponse('Profile created successfully', profile);
  }

  async findAll() {
    const profiles = await this.prisma.profile.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        country: true,
      },
    });
    return formatResponse('Profiles retrieved successfully', profiles);
  }

  async findOne(id: string, userId: string, userRole: Role) {
    const profile = await this.prisma.profile.findUnique({
      where: { id, deletedAt: null },
      include: {
        country: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    if (profile.userId !== userId && userRole === Role.USER) {
      throw new ForbiddenException('You can only access your own profile');
    }

    return formatResponse('Profile retrieved successfully', profile);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto, userId: string, userRole: Role) {
    const profile = await this.prisma.profile.findUnique({
      where: { id, deletedAt: null },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    if (profile.userId !== userId && userRole === Role.USER) {
      throw new ForbiddenException('You can only update your own profile');
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { id },
      data: {
        ...updateProfileDto,
      },
    });

    return formatResponse('Profile updated successfully', updatedProfile);
  }

  async remove(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id, deletedAt: null },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    const deletedProfile = await this.prisma.profile.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Profile deleted successfully', null);
  }
}
