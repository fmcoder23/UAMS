import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    const partner = await this.prisma.partner.create({
      data: createPartnerDto,
    });

    return formatResponse('Partner created successfully', partner);
  }

  async findAll() {
    const partners = await this.prisma.partner.findMany();
    return formatResponse('Partners retrieved successfully', partners);
  }

  async findOne(id: string) {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    return formatResponse('Partner retrieved successfully', partner);
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    const updatedPartner = await this.prisma.partner.update({
      where: { id },
      data: updatePartnerDto,
    });

    return formatResponse('Partner updated successfully', updatedPartner);
  }

  async remove(id: string) {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    await this.prisma.partner.delete({
      where: { id },
    });

    return formatResponse('Partner deleted successfully', null);
  }
}
