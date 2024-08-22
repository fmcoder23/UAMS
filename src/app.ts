import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ApplicationModule } from './application/application.module';
import { DocumentModule } from './document/document.module';
import { FamilyModule } from './family/family.module';
import { ProfileModule } from './profile/profile.module';
import { ProgramModule } from './program/program.module';
import { UniversityModule } from './university/university.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminModule,
    ApplicationModule,
    DocumentModule,
    FamilyModule,
    ProfileModule,
    ProgramModule,
    UniversityModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
