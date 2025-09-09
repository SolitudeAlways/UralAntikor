# 📧 Настройка отправки email

## Проблема
Форма работает, но письма не приходят, потому что не настроен SMTP.

## Решение

### 1. Создайте файл .env
Скопируйте файл `env.example` в `.env`:
```bash
cd UralConstructPro/backend
copy env.example .env
```

### 2. Настройте Gmail App Password

1. **Включите 2FA в Google аккаунте** (если не включено)
2. **Создайте App Password:**
   - Перейдите в [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Выберите "Mail" и "Other (Custom name)"
   - Введите "Ural Construct Pro"
   - Скопируйте сгенерированный пароль (16 символов)

### 3. Обновите .env файл
Откройте `UralConstructPro/backend/.env` и замените:

```env
# SMTP для отправки email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ваш-email@gmail.com
SMTP_PASS=ваш-16-символьный-пароль-приложения

# Email администратора
ADMIN_EMAIL=Mihuil.chugunov@gmail.com

# Порт приложения
PORT=3002
```

### 4. Перезапустите backend
```bash
cd UralConstructPro/backend
npm start
```

## Проверка
После настройки отправьте тестовую заявку через форму. Письмо должно прийти на `Mihuil.chugunov@gmail.com`.

## Альтернатива (для тестирования)
Если не хотите настраивать Gmail, можно временно использовать MailTestService для вывода писем в консоль.
