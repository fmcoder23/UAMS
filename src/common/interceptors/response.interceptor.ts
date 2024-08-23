import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { RESPONSE_DTO_KEY } from '../decorators/response.decorator';
  
  @Injectable()
  export class TransformResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const handler = context.getHandler();
      const metadata = Reflect.getMetadata(RESPONSE_DTO_KEY, handler);
  
      if (!metadata || !metadata.dto) {
        return next.handle();
      }
  
      return next.handle().pipe(
        map((data) => {
          if (Array.isArray(data.data)) {
            const serializedData = data.data.map(item =>
              plainToInstance(metadata.dto, item, { excludeExtraneousValues: true }),
            );
            return { ...data, data: serializedData };
          } else {
            const serializedData = plainToInstance(metadata.dto, data.data, {
              excludeExtraneousValues: true,
            });
            return { ...data, data: serializedData };
          }
        }),
      );
    }
  }
  