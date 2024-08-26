import { Module } from '@nestjs/common';
import { TestScoresService } from './test-scores.service';
import { TestScoresController } from './test-scores.controller';

@Module({
  controllers: [TestScoresController],
  providers: [TestScoresService],
})
export class TestScoresModule {}
