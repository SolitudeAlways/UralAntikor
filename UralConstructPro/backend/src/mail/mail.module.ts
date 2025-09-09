import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { EmailValidationService } from './email-validation.service';

@Module({
  providers: [
    {
      provide: 'MailService',
      useClass: MailService,
    },
    EmailValidationService
  ],
  exports: ['MailService', EmailValidationService],
})
export class MailModule {} 