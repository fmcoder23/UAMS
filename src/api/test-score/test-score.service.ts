import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTestScoreDto } from './dto/create-test-score.dto';
import { UpdateTestScoreDto } from './dto/update-test-score.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class TestScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestScoreDto: CreateTestScoreDto) {
    const { userId, visaId } = createTestScoreDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if visa exists (optional)
    if (visaId) {
      const visa = await this.prisma.visa.findUnique({ where: { id: visaId } });
      if (!visa) {
        throw new NotFoundException(`Visa with ID ${visaId} not found`);
      }
    }

    const testScore = await this.prisma.testScore.create({
      data: createTestScoreDto,
    });

    return formatResponse('TestScore created successfully', testScore);
  }

  async findAll() {
    const testScores = await this.prisma.testScore.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
        visa: true,
      },
    });
    return formatResponse('TestScores retrieved successfully', testScores);
  }

  async findMe(userId: string) {
    const testScores = await this.prisma.testScore.findMany({
      where: { userId, deletedAt: null },
    });
    if (testScores.length === 0) {
      throw new NotFoundException(`No test scores found for user ID ${userId}`);
    }
    return formatResponse('User test scores retrieved successfully', testScores);
  }

  async findOne(id: string) {
    const testScore = await this.prisma.testScore.findUnique({
      where: { id, deletedAt: null },
      include: {
        user: true,
        visa: true,
      },
    });
    if (!testScore) {
      throw new NotFoundException(`TestScore with ID ${id} not found`);
    }
    return formatResponse('TestScore retrieved successfully', testScore);
  }

  async update(id: string, updateTestScoreDto: UpdateTestScoreDto) {
    const testScore = await this.prisma.testScore.findUnique({
      where: { id, deletedAt: null },
    });
    if (!testScore) {
      throw new NotFoundException(`TestScore with ID ${id} not found`);
    }

    const updatedTestScore = await this.prisma.testScore.update({
      where: { id },
      data: updateTestScoreDto,
    });

    return formatResponse('TestScore updated successfully', updatedTestScore);
  }

  async remove(id: string) {
    const testScore = await this.prisma.testScore.findUnique({
      where: { id, deletedAt: null },
    });
    if (!testScore) {
      throw new NotFoundException(`TestScore with ID ${id} not found`);
    }

    await this.prisma.testScore.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('TestScore deleted successfully', null);
  }
}
