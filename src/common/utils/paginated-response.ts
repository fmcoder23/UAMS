import { mixin } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, ValidateNested } from 'class-validator'

type Constructor<T = object> = new (...args: any[]) => T

export function withPaginatedResponse<TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions | undefined,
) {
  class ResponseDTO {
    @ApiProperty({
      description: 'Numbers of total items',
      example: 2,
    })
    @IsNumber()
    total!: number

    @ApiProperty({
      description: 'Current page number',
      example: 2,
    })
    @IsNumber()
    page!: number

    @ApiProperty({
      description: 'Next page number',
      example: 2,
    })
    @IsNumber()
    next!: number

    @ApiProperty({
      isArray: true,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    data!: Array<InstanceType<TBase>>
  }

  return mixin(ResponseDTO) // This is important otherwise you will get always the same instance
}
