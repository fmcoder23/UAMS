import { Injectable } from '@nestjs/common';
import { CreateTestScoreDto } from './dto/create-test-score.dto';
import { UpdateTestScoreDto } from './dto/update-test-score.dto';

@Injectable()
export class TestScoresService {
  create(createTestScoreDto: CreateTestScoreDto) {
    return 'This action adds a new testScore';
  }

  findAll() {
    return `This action returns all testScores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testScore`;
  }

  update(id: number, updateTestScoreDto: UpdateTestScoreDto) {
    return `This action updates a #${id} testScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} testScore`;
  }
}
