import { Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [FamilyController],
  providers: [FamilyService, PrismaService, RolesGuard],
})
export class FamilyModule {}
