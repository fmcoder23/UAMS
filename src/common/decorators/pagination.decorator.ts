import {
    BadRequestException,
    ExecutionContext,
    createParamDecorator,
  } from '@nestjs/common'
  
  export const Pagination = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest()
      const page = parseInt(request.query.page, 10) || 1
      if (page <= 0) {
        throw new BadRequestException('Page must be greater than 0.')
      }
  
      const limit = parseInt(request.query.limit, 10) || 10
      if (limit <= 0) {
        throw new BadRequestException('Limit must be greater than 0.')
      }
      return { page, limit }
    },
  )
  