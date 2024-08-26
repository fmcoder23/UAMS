import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  create(@Body() createProfileDto: CreateProfileDto, @Req() req: Request) {
    const userId = (req.user as JwtPayload).id; 
    return this.profileService.create(createProfileDto, userId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as JwtPayload).id; 
    return this.profileService.findOne(id, userId, (req.user as JwtPayload).role);
  }

  @Put(':id')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @Req() req: Request) {
    const userId = (req.user as JwtPayload).id; 
    return this.profileService.update(id, updateProfileDto, userId, (req.user as JwtPayload).role);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
