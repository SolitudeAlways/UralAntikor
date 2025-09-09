import * as winston from 'winston';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'ural-antikor-api' },
      transports: [
        // Запись в файл
        new winston.transports.File({ 
          filename: 'logs/error.log', 
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5
        }),
        new winston.transports.File({ 
          filename: 'logs/combined.log',
          maxsize: 5242880, // 5MB
          maxFiles: 5
        }),
        // Вывод в консоль
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      ]
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  // Специальные методы для приложения
  logApplication(applicationId: string, action: string, details?: any) {
    this.logger.info('Application action', {
      applicationId,
      action,
      details,
      context: 'Application'
    });
  }

  logEmail(to: string, subject: string, success: boolean, error?: string) {
    this.logger.info('Email sent', {
      to,
      subject,
      success,
      error,
      context: 'Email'
    });
  }

  logSecurity(event: string, ip?: string, userAgent?: string) {
    this.logger.warn('Security event', {
      event,
      ip,
      userAgent,
      context: 'Security'
    });
  }
}
