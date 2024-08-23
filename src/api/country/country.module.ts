import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CountryController],
  providers: [CountryService, AuthGuard],
})
export class CountryModule {}
