import { Injectable, BadRequestException } from '@nestjs/common';
import * as dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

@Injectable()
export class EmailValidationService {
  private readonly rateLimitMap = new Map<string, number>();
  private readonly RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута в миллисекундах

  /**
   * Проверяет существование домена email
   */
  async validateEmailDomain(email: string): Promise<boolean> {
    try {
      const domain = email.split('@')[1];
      if (!domain) {
        return false;
      }

      // Проверяем MX записи для домена
      await resolveMx(domain);
      return true;
    } catch (error) {
      console.warn(`Домен ${email.split('@')[1]} не найден:`, error.message);
      return false;
    }
  }

  /**
   * Проверяет ограничение частоты отправки (1 заявка в минуту)
   */
  checkRateLimit(identifier: string): void {
    const now = Date.now();
    const lastRequest = this.rateLimitMap.get(identifier);

    if (lastRequest && (now - lastRequest) < this.RATE_LIMIT_WINDOW) {
      const remainingTime = Math.ceil((this.RATE_LIMIT_WINDOW - (now - lastRequest)) / 1000);
      throw new BadRequestException(
        `Слишком много заявок. Попробуйте снова через ${remainingTime} секунд.`
      );
    }

    this.rateLimitMap.set(identifier, now);

    // Очищаем старые записи
    this.cleanupRateLimit();
  }

  /**
   * Очищает старые записи из rate limit map
   */
  private cleanupRateLimit(): void {
    const now = Date.now();
    for (const [key, timestamp] of this.rateLimitMap.entries()) {
      if (now - timestamp > this.RATE_LIMIT_WINDOW) {
        this.rateLimitMap.delete(key);
      }
    }
  }

  /**
   * Получает идентификатор для rate limiting (email или IP)
   */
  getRateLimitIdentifier(email: string, ip?: string): string {
    // Используем email как основной идентификатор, IP как fallback
    return email || ip || 'unknown';
  }
}
