import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestScoresService } from './test-scores.service';
import { CreateTestScoreDto } from './dto/create-test-score.dto';
import { UpdateTestScoreDto } from './dto/update-test-score.dto';

@Controller('test-scores')
export class TestScoresController {
  constructor(private readonly testScoresService: TestScoresService) {}

  @Post()
  create(@Body() createTestScoreDto: CreateTestScoreDto) {
    return this.testScoresService.create(createTestScoreDto);
  }

  @Get()
  findAll() {
    return this.testScoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testScoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestScoreDto: UpdateTestScoreDto) {
    return this.testScoresService.update(+id, updateTestScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testScoresService.remove(+id);
  }
}
