import { ApiPropertyOptions } from '@nestjs/swagger'

import { withBaseResponse } from '../utils/base-response'

export const RESPONSE_DTO_KEY = 'api_response_dto'

export function ResponseDTO(
  dto: any,
  options?: ApiPropertyOptions,
): MethodDecorator & ClassDecorator {
  return (
    target: object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ): any => {
    const swagger_dto = withBaseResponse(dto, options)

    if (descriptor) {
      Reflect.defineMetadata(
        'swagger/apiResponse',
        {
          default: {
            type: swagger_dto,
          },
        },
        descriptor.value,
      )
      Reflect.defineMetadata(
        RESPONSE_DTO_KEY,
        {
          dto,
        },
        descriptor.value,
      )

      return descriptor
    }

    Reflect.defineMetadata(
      'swagger/apiResponse',
      {
        default: {
          type: swagger_dto,
        },
      },
      target,
    )
    Reflect.defineMetadata(
      RESPONSE_DTO_KEY,
      {
        dto,
      },
      target,
    )

    return target
  }
}
