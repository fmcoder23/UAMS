import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class UniversityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUniversityDto: CreateUniversityDto) {
    const { name, countryId } = createUniversityDto;

    await this.ensureUniversityDoesNotExist(name);
    await this.ensureCountryExists(countryId);

    const newUniversity = await this.prisma.university.create({
      data: createUniversityDto,
    });

    return formatResponse('University created successfully', newUniversity);
  }

  async findAll() {
    const universities = await this.prisma.university.findMany({
      where: { deletedAt: null },
      include: {
        country: true,
        programs: true,
      },
    });
    return formatResponse('Universities retrieved successfully', universities);
  }

  async findOne(id: string) {
    const university = await this.findUniversityById(id);
    return formatResponse('University retrieved successfully', university);
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    await this.findUniversityById(id);

    const updatedUniversity = await this.prisma.university.update({
      where: { id },
      data: updateUniversityDto,
    });

    return formatResponse('University updated successfully', updatedUniversity);
  }

  async remove(id: string) {
    await this.findUniversityById(id);

    const deletedUniversity = await this.prisma.university.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('University deleted successfully', deletedUniversity);
  }

  private async ensureUniversityDoesNotExist(name: string) {
    const existingUniversity = await this.prisma.university.findUnique({ where: { name } });
    if (existingUniversity) {
      throw new ConflictException('University name already exists');
    }
  }

  private async ensureCountryExists(countryId: string) {
    const country = await this.prisma.country.findUnique({ where: { id: countryId } });
    if (!country) {
      throw new NotFoundException('Country not found');
    }
  }

  private async findUniversityById(id: string) {
    const university = await this.prisma.university.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        country: true,
        programs: true,
      },
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    return university;
  }
}
