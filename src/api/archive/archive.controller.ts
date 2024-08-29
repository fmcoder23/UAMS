import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@ApiTags('Archive')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  create(@Body() createArchiveDto: CreateArchiveDto, @Req() req: Request) {
    const creatorId = (req.user as JwtPayload).id;
    return this.archiveService.create(createArchiveDto, creatorId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.archiveService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.archiveService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateArchiveDto: UpdateArchiveDto) {
    return this.archiveService.update(id, updateArchiveDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.archiveService.remove(id);
  }
}
