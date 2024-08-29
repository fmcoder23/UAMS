import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { VisaService } from './visa.service';
import { CreateVisaDto } from './dto/create-visa.dto';
import { UpdateVisaDto } from './dto/update-visa.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@ApiTags('Visa')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('visa')
export class VisaController {
  constructor(private readonly visaService: VisaService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  create(@Body() createVisaDto: CreateVisaDto, @Req() req: Request) {
    const creatorId = (req.user as JwtPayload).id; 
    return this.visaService.create(createVisaDto, creatorId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.visaService.findAll();
  }

  @Get('me')
  @Roles(Role.USER)
  findMe(@Req() req: Request) {
    const userId = (req.user as JwtPayload).id;
    return this.visaService.findMe(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.visaService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateVisaDto: UpdateVisaDto) {
    return this.visaService.update(id, updateVisaDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.visaService.remove(id);
  }
}
