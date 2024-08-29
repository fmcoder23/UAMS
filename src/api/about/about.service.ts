import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class AboutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAboutDto: CreateAboutDto) {
    const about = await this.prisma.about.create({
      data: createAboutDto,
    });

    return formatResponse('About section created successfully', about);
  }

  async findAll() {
    const abouts = await this.prisma.about.findMany();
    return formatResponse('About sections retrieved successfully', abouts);
  }

  async findOne(id: string) {
    const about = await this.prisma.about.findUnique({
      where: { id },
    });

    if (!about) {
      throw new NotFoundException(`About section with ID ${id} not found`);
    }

    return formatResponse('About section retrieved successfully', about);
  }

  async update(id: string, updateAboutDto: UpdateAboutDto) {
    const about = await this.prisma.about.findUnique({
      where: { id },
    });

    if (!about) {
      throw new NotFoundException(`About section with ID ${id} not found`);
    }

    const updatedAbout = await this.prisma.about.update({
      where: { id },
      data: updateAboutDto,
    });

    return formatResponse('About section updated successfully', updatedAbout);
  }

  async remove(id: string) {
    const about = await this.prisma.about.findUnique({
      where: { id },
    });

    if (!about) {
      throw new NotFoundException(`About section with ID ${id} not found`);
    }

    await this.prisma.about.delete({
      where: { id },
    });

    return formatResponse('About section deleted successfully', null);
  }
}