import { Module } from '@nestjs/common';
import { TestScoreService } from './test-score.service';
import { TestScoreController } from './test-score.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TestScoreController],
  providers: [TestScoreService],
})
export class TestScoreModule {}
