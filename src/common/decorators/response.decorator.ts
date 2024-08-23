import { ApiPropertyOptions } from '@nestjs/swagger';
import { withBaseResponse } from '../utils/base-response';
import { applyDecorators } from '@nestjs/common';

export const RESPONSE_DTO_KEY = 'api_response_dto';

export interface ResponseDTOOptions extends ApiPropertyOptions {
  status?: number;
  description?: string;
}

type Constructor<T = any> = new (...args: any[]) => T;

export function ResponseDTO<T extends Constructor>(
  dto: T,
  options?: ResponseDTOOptions,
): MethodDecorator & ClassDecorator {
  return applyDecorators(
    (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
      const swagger_dto = withBaseResponse(dto, options);

      if (descriptor) {
        Reflect.defineMetadata(
          'swagger/apiResponse',
          {
            default: {
              type: swagger_dto,
              status: options?.status || 200,
              description: options?.description || 'Successful response',
            },
          },
          descriptor.value,
        );
        Reflect.defineMetadata(
          RESPONSE_DTO_KEY,
          {
            dto,
          },
          descriptor.value,
        );

        return descriptor;
      }

      Reflect.defineMetadata(
        'swagger/apiResponse',
        {
          default: {
            type: swagger_dto,
            status: options?.status || 200,
            description: options?.description || 'Successful response',
          },
        },
        target,
      );
      Reflect.defineMetadata(
        RESPONSE_DTO_KEY,
        {
          dto,
        },
        target,
      );

      return target;
    },
  );
}
