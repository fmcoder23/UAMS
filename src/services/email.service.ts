import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    setTimeout(() => console.warn('⚠️ EMAIL SERVICE NOT IMPLETENTED'), 2000)
  }

  async send(email: string, message: string) {
    console.log(email, message)
  }
}
