import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { ApplicationModule } from './api/application/application.module';
import { DocumentModule } from './api/document/document.module';
import { FamilyModule } from './api/family/family.module';
import { ProfileModule } from './api/profile/profile.module';
import { ProgramModule } from './api/program/program.module';
import { UniversityModule } from './api/university/university.module';
import { UserModule } from './api/user/user.module';
import { CountryModule } from './api/country/country.module';
import { UploadModule } from './api/upload/upload.module';
import { EducationModule } from './api/education/education.module';
import { ContractModule } from './api/contract/contract.module';
import { TestScoreModule } from './api/test-score/test-score.module';
import { TranslationModule } from './api/translation/translation.module';
import { ArchiveModule } from './api/archive/archive.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UploadModule,
    AuthModule,
    ProfileModule,
    FamilyModule,
    EducationModule,
    ContractModule,
    TestScoreModule,
    TranslationModule,
    ApplicationModule,
    DocumentModule,
    UserModule,
    UniversityModule,
    ProgramModule,
    ArchiveModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
