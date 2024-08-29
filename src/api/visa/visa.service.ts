import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisaDto } from './dto/create-visa.dto';
import { UpdateVisaDto } from './dto/update-visa.dto';
import { formatResponse } from 'src/common/utils/response.util';
import { AppStatus } from '@prisma/client';

@Injectable()
export class VisaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVisaDto: CreateVisaDto, creatorId: string) {
    const { userId, universityId } = createVisaDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if university exists
    const university = await this.prisma.university.findUnique({ where: { id: universityId } });
    if (!university) {
      throw new NotFoundException(`University with ID ${universityId} not found`);
    }

    // Check if user has applied to the university and the application status is ACCEPTED
    const application = await this.prisma.application.findFirst({
      where: {
        userId,
        universityId,
        appStatus: AppStatus.ACCEPTED,
      },
    });

    if (!application) {
      throw new ForbiddenException(
        `User with ID ${userId} has not been accepted to the university with ID ${universityId}`
      );
    }

    // Find the creator's name
    const creator = await this.prisma.user.findUnique({ where: { id: creatorId } });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${creatorId} not found`);
    }

    const visa = await this.prisma.visa.create({
      data: {
        ...createVisaDto,
        createdBy: creator.fullname,
      },
    });

    return formatResponse('Visa entry created successfully', visa);
  }

  async findAll() {
    const visas = await this.prisma.visa.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
        university: true,
        testScores: true,
      },
    });
    return formatResponse('Visas retrieved successfully', visas);
  }

  async findOne(id: string) {
    const visa = await this.prisma.visa.findUnique({
      where: { id, deletedAt: null },
      include: {
        user: true,
        university: true,
        testScores: true,
      },
    });
    if (!visa) {
      throw new NotFoundException(`Visa entry with ID ${id} not found`);
    }
    return formatResponse('Visa entry retrieved successfully', visa);
  }

  async findMe(userId: string) {
    const visas = await this.prisma.visa.findMany({
      where: { userId, deletedAt: null },
      include: {
        university: true,
        testScores: true,
      },
    });

    if (visas.length === 0) {
      throw new NotFoundException(`No visa entries found for user ID ${userId}`);
    }

    return formatResponse('User visa entries retrieved successfully', visas);
  }

  async update(id: string, updateVisaDto: UpdateVisaDto) {
    const visa = await this.prisma.visa.findUnique({
      where: { id, deletedAt: null },
    });
    if (!visa) {
      throw new NotFoundException(`Visa entry with ID ${id} not found`);
    }

    const updatedVisa = await this.prisma.visa.update({
      where: { id },
      data: updateVisaDto,
    });

    return formatResponse('Visa entry updated successfully', updatedVisa);
  }

  async remove(id: string) {
    const visa = await this.prisma.visa.findUnique({
      where: { id, deletedAt: null },
    });
    if (!visa) {
      throw new NotFoundException(`Visa entry with ID ${id} not found`);
    }

    await this.prisma.visa.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Visa entry deleted successfully', null);
  }
}
