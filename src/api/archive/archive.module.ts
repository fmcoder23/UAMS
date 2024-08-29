import { Module } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArchiveController],
  providers: [ArchiveService],
})
export class ArchiveModule {}
