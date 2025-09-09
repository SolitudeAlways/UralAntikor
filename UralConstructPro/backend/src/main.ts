import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка CORS (упрощенная для разработки)
  app.enableCors({
    origin: true, // Разрешаем все origin в разработке
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Recipient-Email'
    ],
    exposedHeaders: ['X-Total-Count'],
  });

  // Глобальная валидация
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Глобальный rate limiting (убираем, так как он уже настроен в модуле)
  // app.useGlobalGuards(new ThrottlerGuard());

  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('Ural Construct Pro API')
    .setDescription('API для сайта металлоконструкций')
    .setVersion('1.0')
    .addTag('applications')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`🚀 Приложение запущено на порту ${port}`);
  console.log(`📚 Swagger документация: http://localhost:${port}/api`);
}
bootstrap();
