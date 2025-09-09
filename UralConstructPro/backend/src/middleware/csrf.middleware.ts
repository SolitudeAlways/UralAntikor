import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Проверяем только POST, PUT, DELETE запросы
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      const referer = req.get('Referer') || req.get('Origin');
      const host = req.get('Host');
      
      // Разрешенные домены
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002'
      ];
      
      // В production добавить реальные домены
      if (process.env.NODE_ENV === 'production') {
        allowedOrigins.push(
          'https://yourdomain.com',
          'https://www.yourdomain.com'
        );
      }
      
      // Проверяем, что запрос пришел с разрешенного домена
      if (referer) {
        const refererUrl = new URL(referer);
        const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;
        
        if (!allowedOrigins.includes(refererOrigin)) {
          throw new ForbiddenException('CSRF: Неразрешенный источник запроса');
        }
      } else {
        // Если нет Referer, проверяем User-Agent (может быть API клиент)
        const userAgent = req.get('User-Agent');
        if (!userAgent || userAgent.includes('curl') || userAgent.includes('Postman')) {
          // Разрешаем API клиентам
          return next();
        }
        
        throw new ForbiddenException('CSRF: Отсутствует Referer заголовок');
      }
    }
    
    next();
  }
}
