import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { TestScoreService } from './test-score.service';
import { CreateTestScoreDto } from './dto/create-test-score.dto';
import { UpdateTestScoreDto } from './dto/update-test-score.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@ApiTags('TestScore')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('testscore')
export class TestScoreController {
  constructor(private readonly testScoreService: TestScoreService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  create(@Body() createTestScoreDto: CreateTestScoreDto) {
    return this.testScoreService.create(createTestScoreDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.testScoreService.findAll();
  }

  @Get('me')
  @Roles(Role.USER)
  findMe(@Req() req: Request) {
    const userId = (req.user as JwtPayload).id;
    return this.testScoreService.findMe(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.testScoreService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateTestScoreDto: UpdateTestScoreDto) {
    return this.testScoreService.update(id, updateTestScoreDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.testScoreService.remove(id);
  }
}
