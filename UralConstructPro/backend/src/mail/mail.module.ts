import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { EmailValidationService } from './email-validation.service';
import { MailTestService } from './mail-test.service'; // For testing without SMTP

@Module({
  providers: [
    {
      provide: 'MailService',
      useClass: MailTestService, // Using test service for now
    },
    EmailValidationService
  ],
  exports: ['MailService', EmailValidationService],
})
export class MailModule {} 