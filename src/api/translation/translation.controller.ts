import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@ApiTags('Translation')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  create(@Body() createTranslationDto: CreateTranslationDto, @Req() req: Request) {
    const creatorId = (req.user as JwtPayload).id; 
    return this.translationService.create(createTranslationDto, creatorId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.translationService.findAll();
  }

  @Get('me')
  @Roles(Role.USER)
  findMe(@Req() req: Request) {
    const userId = (req.user as JwtPayload).id;
    return this.translationService.findMe(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.translationService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateTranslationDto: UpdateTranslationDto) {
    return this.translationService.update(id, updateTranslationDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.translationService.remove(id);
  }
}
