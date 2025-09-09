import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { EmailValidationService } from './email-validation.service';
import { LoggerService } from '../utils/logger';

@Module({
  providers: [
    {
      provide: 'MailService',
      useClass: MailService,
    },
    EmailValidationService,
    LoggerService
  ],
  exports: ['MailService', EmailValidationService],
})
export class MailModule {} 