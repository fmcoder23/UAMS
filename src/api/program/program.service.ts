import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UniversityService } from '../university/university.service';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class ProgramService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly universityService: UniversityService
  ) {}

  async create(createProgramDto: CreateProgramDto) {
    const { name, description, universityId } = createProgramDto;

    await this.universityService.findOne(universityId);

    const existingProgram = await this.prisma.program.findFirst({
      where: { name, universityId, deletedAt: null },
    });

    if (existingProgram) {
      throw new ConflictException("Program already exists in this university");
    }

    const newProgram = await this.prisma.program.create({
      data: {
        name,
        description,
        universityId,
      },
    });

    return formatResponse("Program created successfully", newProgram);
  }

  async findAll() {
    const programs = await this.prisma.program.findMany({
      where: { deletedAt: null },
      include: { university: true },
    });

    return formatResponse("Programs retrieved successfully", programs);
  }

  async findOne(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id, deletedAt: null },
      include: { university: true },
    });

    if (!program) {
      throw new NotFoundException("Program not found");
    }

    return formatResponse("Program retrieved successfully", program);
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    const program = await this.prisma.program.findUnique({
      where: { id, deletedAt: null },
    });

    if (!program) {
      throw new NotFoundException("Program not found");
    }

    const conflictingProgram = await this.prisma.program.findFirst({
      where: {
        name: updateProgramDto.name,
        universityId: updateProgramDto.universityId,
        id: { not: id },
        deletedAt: null,
      },
    });

    if (conflictingProgram) {
      throw new ConflictException("Another program with the same name exists in this university");
    }

    const updatedProgram = await this.prisma.program.update({
      where: { id },
      data: updateProgramDto,
    });

    return formatResponse("Program updated successfully", updatedProgram);
  }

  async remove(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id, deletedAt: null },
    });

    if (!program) {
      throw new NotFoundException("Program not found");
    }

    await this.prisma.program.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse("Program removed successfully", []);
  }
}
