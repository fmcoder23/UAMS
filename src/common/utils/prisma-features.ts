interface QueryParams {
    page?: number;
    limit?: number;
    sort?: string;
    fields?: string;
    [key: string]: any;
  }
  
  export class PrismaFeatures<T> {
    private queryParams: QueryParams;
    private model: any;
  
    constructor(model: any, queryParams: QueryParams) {
      this.queryParams = queryParams;
      this.model = model;
    }
  
    async filter() {
      const queryObj = { ...this.queryParams };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((field) => delete queryObj[field]);
  
      // Convert operators for Prisma
      const prismaFilter = {};
      for (const [key, value] of Object.entries(queryObj)) {
        if (typeof value === 'object' && value !== null) {
          prismaFilter[key] = this.convertOperators(value);
        } else {
          prismaFilter[key] = value;
        }
      }
  
      return prismaFilter;
    }
  
    sort() {
      if (this.queryParams.sort) {
        const sortBy = this.queryParams.sort.split(',').map((field) => {
          if (field.startsWith('-')) {
            return { [field.substring(1)]: 'desc' };
          }
          return { [field]: 'asc' };
        });
  
        return sortBy;
      } else {
        return [{ createdAt: 'desc' }];
      }
    }
  
    fields() {
      if (this.queryParams.fields) {
        const fields = this.queryParams.fields.split(',').reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {});
  
        return fields;
      } else {
        return null;
      }
    }
  
    paginate() {
      const page = +this.queryParams.page || 1;
      const limit = +this.queryParams.limit || 10;
      const skip = (page - 1) * limit;
  
      return { skip, take: limit };
    }
  
    async execute() {
      const filter = await this.filter();
      const sort = this.sort();
      const select = this.fields();
      const pagination = this.paginate();
  
      const result = await this.model.findMany({
        where: filter,
        orderBy: sort,
        select: select || undefined,
        ...pagination,
      });
  
      const total = await this.model.count({ where: filter });
      const totalPages = Math.ceil(total / (+pagination.take || 10));
      const currentPage = +pagination.skip / (+pagination.take || 10) + 1;
  
      return {
        result,
        total,
        totalPages,
        currentPage,
      };
    }
  
    private convertOperators(filterObj: any) {
      const prismaFilter = {};
      for (const [key, value] of Object.entries(filterObj)) {
        switch (key) {
          case 'gte':
            prismaFilter['gte'] = value;
            break;
          case 'gt':
            prismaFilter['gt'] = value;
            break;
          case 'lte':
            prismaFilter['lte'] = value;
            break;
          case 'lt':
            prismaFilter['lt'] = value;
            break;
          default:
            prismaFilter[key] = value;
        }
      }
      return prismaFilter;
    }
  }
  