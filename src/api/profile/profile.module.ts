import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [ProfileService, RolesGuard],
})
export class ProfileModule {}
