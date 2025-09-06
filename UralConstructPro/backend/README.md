# Ural Construct Pro - Backend

Backend для сайта металлоконструкций на NestJS с TypeORM и PostgreSQL.

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка базы данных
1. Установите PostgreSQL
2. Создайте базу данных:
```sql
CREATE DATABASE ural_construct;
```

### 3. Настройка переменных окружения
Скопируйте файл конфигурации:
```bash
cp env.example .env
```

Отредактируйте `.env` файл:
```env
# База данных
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_NAME=ural_construct

# SMTP для отправки email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email администратора
ADMIN_EMAIL=admin@uralconstruct.ru

# Порт приложения
PORT=3000

# Окружение
NODE_ENV=development
```

### 4. Запуск приложения

**Режим разработки:**
```bash
npm run start:dev
```

**Продакшн:**
```bash
npm run build
npm run start:prod
```

## 📚 API Документация

После запуска приложения Swagger документация доступна по адресу:
```
http://localhost:3000/api
```

## 🗄️ База данных

### Миграции
```bash
# Создать миграцию
npm run migration:generate -- src/migrations/CreateApplications

# Применить миграции
npm run migration:run

# Откатить миграцию
npm run migration:revert
```

### Автоматическая синхронизация
В режиме разработки (`NODE_ENV=development`) TypeORM автоматически синхронизирует схему базы данных.

## 📧 Email уведомления

При создании заявки отправляются два email:
1. **Уведомление администратору** - с полными данными заявки
2. **Подтверждение клиенту** - с номером заявки и контактами

### Настройка Gmail SMTP
1. Включите двухфакторную аутентификацию
2. Создайте пароль приложения
3. Используйте этот пароль в `SMTP_PASS`

## 🔧 Структура проекта

```
src/
├── applications/          # Модуль заявок
│   ├── application.entity.ts
│   ├── applications.controller.ts
│   ├── applications.service.ts
│   ├── applications.module.ts
│   └── dto/
│       └── create-application.dto.ts
├── mail/                 # Модуль email
│   ├── mail.service.ts
│   └── mail.module.ts
├── config/               # Конфигурация
│   └── typeorm.config.ts
├── app.module.ts         # Главный модуль
├── app.controller.ts     # Главный контроллер
├── app.service.ts        # Главный сервис
└── main.ts              # Точка входа
```

## 📋 API Endpoints

### Заявки
- `POST /applications` - Создать заявку
- `GET /applications` - Получить все заявки
- `GET /applications/:id` - Получить заявку по ID
- `PUT /applications/:id/status` - Обновить статус заявки
- `GET /applications/statistics` - Получить статистику

## 🛠️ Команды

```bash
# Разработка
npm run start:dev          # Запуск в режиме разработки
npm run start:debug        # Запуск с отладкой

# Сборка
npm run build              # Сборка проекта
npm run start:prod         # Запуск продакшн версии

# Тестирование
npm run test               # Запуск тестов
npm run test:watch         # Тесты в режиме наблюдения
npm run test:cov           # Тесты с покрытием

# Линтинг и форматирование
npm run lint               # Проверка кода
npm run format             # Форматирование кода

# База данных
npm run migration:generate # Создать миграцию
npm run migration:run      # Применить миграции
npm run migration:revert   # Откатить миграцию
```

## 🔒 Безопасность

- Валидация всех входящих данных
- CORS настройки для фронтенда
- Защита от SQL инъекций через TypeORM
- Безопасная отправка email через SMTP

## 📝 Логирование

Приложение логирует:
- Запуск сервера
- Создание заявок
- Отправку email уведомлений
- Ошибки валидации и базы данных
