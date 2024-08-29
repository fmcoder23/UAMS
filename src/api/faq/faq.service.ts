import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    const faq = await this.prisma.fAQ.create({
      data: createFaqDto,
    });

    return formatResponse('FAQ created successfully', faq);
  }

  async findAll() {
    const faqs = await this.prisma.fAQ.findMany();
    return formatResponse('FAQs retrieved successfully', faqs);
  }

  async findOne(id: string) {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    return formatResponse('FAQ retrieved successfully', faq);
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    const updatedFaq = await this.prisma.fAQ.update({
      where: { id },
      data: updateFaqDto,
    });

    return formatResponse('FAQ updated successfully', updatedFaq);
  }

  async remove(id: string) {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    await this.prisma.fAQ.delete({
      where: { id },
    });

    return formatResponse('FAQ deleted successfully', null);
  }
}
