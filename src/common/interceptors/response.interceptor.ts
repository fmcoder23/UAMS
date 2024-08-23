import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common'
  import { plainToInstance } from 'class-transformer'
  import { Observable } from 'rxjs'
  import { map } from 'rxjs/operators'
  
  import { RESPONSE_DTO_KEY } from '../decorators/response.decorator'
  
  @Injectable()
  export class TransformResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const metadata = Reflect.getMetadata(RESPONSE_DTO_KEY, context.getHandler())
  
      if (!metadata || !metadata.dto) {
        return next.handle()
      }
  
      return next.handle().pipe(
        map((data) => {
          const serialized_data = plainToInstance(metadata.dto, data.data, {
            excludeExtraneousValues: true,
          })
          return { ...data, data: serialized_data }
        }),
      )
    }
  }
  