import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class ApplicationService {
  private readonly maxApplicationsPerUser = 5;

  constructor(private readonly prisma: PrismaService) {}

  async create(createApplicationDto: CreateApplicationDto, creatorId: string) {
    const { userId, universityId, programId } = createApplicationDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if the user has already reached the application limit
    const userApplicationsCount = await this.prisma.application.count({
      where: { userId, deletedAt: null },
    });

    if (userApplicationsCount >= this.maxApplicationsPerUser) {
      throw new ConflictException(`User with ID ${userId} has reached the maximum of ${this.maxApplicationsPerUser} applications.`);
    }

    // Check if university exists
    const university = await this.prisma.university.findUnique({ where: { id: universityId } });
    if (!university) {
      throw new NotFoundException(`University with ID ${universityId} not found`);
    }

    // Check if program exists
    const program = await this.prisma.program.findUnique({ where: { id: programId } });
    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }

    // Fetch the creator's name
    const creator = await this.prisma.user.findUnique({ where: { id: creatorId } });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${creatorId} not found`);
    }

    const application = await this.prisma.application.create({
      data: {
        ...createApplicationDto,
        createdBy: creator.fullname,
      },
    });

    return formatResponse('Application created successfully', application);
  }

  async findAll() {
    const applications = await this.prisma.application.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
        university: true,
        program: true,
      },
    });
    return formatResponse('Applications retrieved successfully', applications);
  }

  async findMe(userId: string) {
    const applications = await this.prisma.application.findMany({
      where: { userId, deletedAt: null },
      include: {
        university: true,
        program: true,
      },
    });
    if (applications.length === 0) {
      throw new NotFoundException(`No applications found for user ID ${userId}`);
    }
    return formatResponse('User applications retrieved successfully', applications);
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id, deletedAt: null },
      include: {
        user: true,
        university: true,
        program: true,
      },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return formatResponse('Application retrieved successfully', application);
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.prisma.application.findUnique({
      where: { id, deletedAt: null },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    const updatedApplication = await this.prisma.application.update({
      where: { id },
      data: updateApplicationDto,
    });

    return formatResponse('Application updated successfully', updatedApplication);
  }

  async remove(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id, deletedAt: null },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    await this.prisma.application.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Application deleted successfully', null);
  }
}
