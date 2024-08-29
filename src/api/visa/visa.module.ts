import { Module } from '@nestjs/common';
import { VisaService } from './visa.service';
import { VisaController } from './visa.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VisaController],
  providers: [VisaService],
})
export class VisaModule {}
