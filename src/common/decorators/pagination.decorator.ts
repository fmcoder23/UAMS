import {
    BadRequestException,
    ExecutionContext,
    createParamDecorator,
  } from '@nestjs/common';
  
  interface PaginationOptions {
    defaultPage?: number;
    defaultLimit?: number;
    maxLimit?: number;
    pageQueryParam?: string;
    limitQueryParam?: string;
  }
  
  export const Pagination = createParamDecorator(
    (options: PaginationOptions = {}, context: ExecutionContext) => {
      const {
        defaultPage = 1,
        defaultLimit = 10,
        maxLimit = 100,
        pageQueryParam = 'page',
        limitQueryParam = 'limit',
      } = options;
  
      const request = context.switchToHttp().getRequest();
      const query = request.query;
  
      const page = parseInt(query[pageQueryParam], 10) || defaultPage;
      if (page <= 0) {
        throw new BadRequestException(`${pageQueryParam} must be greater than 0.`);
      }
  
      let limit = parseInt(query[limitQueryParam], 10) || defaultLimit;
      if (limit <= 0) {
        throw new BadRequestException(`${limitQueryParam} must be greater than 0.`);
      }
      if (limit > maxLimit) {
        limit = maxLimit;
      }
  
      return { page, limit };
    },
  );
  