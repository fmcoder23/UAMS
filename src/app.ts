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
import { VisaModule } from './api/visa/visa.module';
import { AboutModule } from './api/about/about.module';
import { FaqModule } from './api/faq/faq.module';
import { ContactModule } from './api/contact/contact.module';
import { PartnerModule } from './api/partner/partner.module';

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
    VisaModule,
    UserModule,
    UniversityModule,
    ProgramModule,
    ArchiveModule,
    CountryModule,
    AboutModule,
    FaqModule,
    ContactModule,
    PartnerModule,
  ],
})
export class AppModule { }
