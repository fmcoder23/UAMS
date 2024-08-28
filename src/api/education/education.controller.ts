import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@ApiTags('Education')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  create(@Body() createEducationDto: CreateEducationDto, @Req() req: Request) {
    const userId = (req.user as JwtPayload).id;
    return this.educationService.create(createEducationDto, userId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.educationService.findAll();
  }

  @Get('me')
  @Roles(Role.USER)
  findMe(@Req() req: Request) {
    const userId = (req.user as JwtPayload).id;
    return this.educationService.findMe(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(id, '', Role.ADMIN);
  }

  @Put(':id')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto, @Req() req: Request) {
    const userId = (req.user as JwtPayload).id;
    return this.educationService.update(id, updateEducationDto, userId, (req.user as JwtPayload).role);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
