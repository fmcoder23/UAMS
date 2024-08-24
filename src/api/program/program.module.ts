import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UniversityModule } from '../university/university.module';
import { UniversityService } from '../university/university.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProgramController],
  providers: [ProgramService, UniversityService],
})
export class ProgramModule { }
