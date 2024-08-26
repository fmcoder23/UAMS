import { Controller, Get, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'sort', required: false, type: String, description: 'Sort by field' })
  @ApiQuery({ name: 'fields', required: false, type: String, description: 'Select specific fields' })
  async findAll(

    @Query() query: any,
  ) {
    const { results, total } = await this.countryService.findAll(query);
    const page = +query.page * 1 || 1;
    const limit = +query.limit * 1 || 10;

    return {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: results,
    };
  }
}
