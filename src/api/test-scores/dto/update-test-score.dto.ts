import { PartialType } from '@nestjs/mapped-types';
import { CreateTestScoreDto } from './create-test-score.dto';

export class UpdateTestScoreDto extends PartialType(CreateTestScoreDto) {}
