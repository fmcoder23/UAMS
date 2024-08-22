-- CreateEnum
CREATE TYPE "Gender" AS ENUM('MALE', 'FEMALE', 'M', 'F');

-- CreateEnum
CREATE TYPE "ProgramType" AS ENUM('BACHELORS', 'MASTERS');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM('ADMIN', 'ROOT');

-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM( 'APPLIED', 'ACCEPTED', 'REJECTED' );

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM('PAID', 'UNPAID');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "User_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "photo" TEXT,
    "city" TEXT NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "phone" TEXT,
    "gender" "Gender" NOT NULL,
    "countryId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "Profile_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Family" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fatherFirstName" TEXT,
    "fatherLastName" TEXT,
    "fatherBirthDate" TIMESTAMP(3),
    "fatherPassportNumber" TEXT,
    "fatherPhone" TEXT,
    "fatherOccupation" TEXT,
    "motherFirstName" TEXT,
    "motherLastName" TEXT,
    "motherBirthDate" TIMESTAMP(3),
    "motherPassportNumber" TEXT,
    "motherPhone" TEXT,
    "motherOccupation" TEXT,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "Family_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "Country_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "University" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "photos" TEXT[],
    "name" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "countryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "University_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Program" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "programType" "ProgramType" NOT NULL,
    "programFee" INTEGER NOT NULL,
    "universityId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "Program_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP 


CONSTRAINT "Admin_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Application" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "universityId" UUID NOT NULL,
    "programId" UUID NOT NULL,
    "appStatus" "AppStatus" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "Application_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "FavoriteUniversity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "universityId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


CONSTRAINT "FavoriteUniversity_pkey" PRIMARY KEY ("id") );

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User" ("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile" ("userId");

-- CreateIndex
CREATE INDEX "Profile_phone_idx" ON "Profile" ("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_passportNumber_key" ON "Profile" ("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Family_userId_key" ON "Family" ("userId");

-- CreateIndex
CREATE INDEX "Family_fatherPassportNumber_idx" ON "Family" ("fatherPassportNumber");

-- CreateIndex
CREATE INDEX "Family_motherPassportNumber_idx" ON "Family" ("motherPassportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country" ("name");

-- CreateIndex
CREATE INDEX "University_name_idx" ON "University" ("name");

-- CreateIndex
CREATE INDEX "University_countryId_idx" ON "University" ("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University" ("name");

-- CreateIndex
CREATE INDEX "Program_name_idx" ON "Program" ("name");

-- CreateIndex
CREATE INDEX "Program_universityId_idx" ON "Program" ("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin" ("username");

-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "Application" ("userId");

-- CreateIndex
CREATE INDEX "Application_universityId_idx" ON "Application" ("universityId");

-- CreateIndex
CREATE INDEX "Application_programId_idx" ON "Application" ("programId");

-- CreateIndex
CREATE INDEX "Application_universityId_programId_idx" ON "Application" ("universityId", "programId");

-- CreateIndex
CREATE INDEX "Application_appStatus_idx" ON "Application" ("appStatus");

-- AddForeignKey
ALTER TABLE "Profile"
ADD CONSTRAINT "Profile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Profile"
ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Family"
ADD CONSTRAINT "Family_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "University"
ADD CONSTRAINT "University_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Program"
ADD CONSTRAINT "Program_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Application"
ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Application"
ADD CONSTRAINT "Application_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Application"
ADD CONSTRAINT "Application_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FavoriteUniversity"
ADD CONSTRAINT "FavoriteUniversity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FavoriteUniversity"
ADD CONSTRAINT "FavoriteUniversity_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;