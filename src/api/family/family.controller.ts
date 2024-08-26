import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@ApiTags('Family')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  create(@Body() createFamilyDto: CreateFamilyDto, @Req() req: Request) {
    const userId = (req.user as JwtPayload).id; 
    return this.familyService.create(createFamilyDto, userId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.familyService.findAll();
  }

  @Get('me')
  @Roles(Role.USER)
  findMe(@Req() req: Request) {
    const userId = (req.user as JwtPayload).id;
    return this.familyService.findMe(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.familyService.findOne(id, '', Role.ADMIN);
  }

  @Put(':id')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto, @Req() req: Request) {
    const userId = (req.user as JwtPayload).id; 
    return this.familyService.update(id, updateFamilyDto, userId, (req.user as JwtPayload).role);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.familyService.remove(id);
  }
}
