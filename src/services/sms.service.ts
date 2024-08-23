import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SmsService {
  constructor(private configService: ConfigService) {
    setTimeout(() => console.warn('⚠️ SMS SERVICE NOT IMPLETENTED'), 2000)
  }

  async send(phone_number: string, message: string) {
    console.log(phone_number, message)
  }
}
