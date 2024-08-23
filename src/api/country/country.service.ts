import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { PrismaFeatures } from 'src/common/utils/prisma-features';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any): Promise<{ results: Country[]; total: number }> {
    const prismaFeatures = new PrismaFeatures(this.prisma.country, query);

    const { result, total } = await prismaFeatures.execute();

    return {
      results: result, 
      total,
    };
  }
}
