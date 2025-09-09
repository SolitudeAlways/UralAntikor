# Настройка отправки заявок на email

## Обзор функционала

Реализована система отправки заявок на email с поддержкой:

- **Динамический email**: Email для отправки заявок берется из header `X-Recipient-Email`
- **Две формы**: Форма в каталоге и форма в modal-content (страница категории)
- **Валидация email**: Проверка существования домена email
- **Защита от спама**: Ограничение 1 заявка в минуту с одного email/IP
- **Красивый HTML шаблон**: Современное оформление писем
- **Поддержка productTitle**: Название изделия в письмах

## Backend изменения

### 1. Новые файлы
- `src/mail/email-validation.service.ts` - сервис валидации email и защиты от спама
- `src/migrations/add-product-title.ts` - миграция для добавления поля productTitle

### 2. Обновленные файлы
- `src/applications/dto/create-application.dto.ts` - добавлено поле productTitle
- `src/applications/application.entity.ts` - добавлено поле productTitle
- `src/mail/mail.service.ts` - поддержка динамического email и улучшенный шаблон
- `src/mail/mail.module.ts` - экспорт EmailValidationService
- `src/applications/applications.controller.ts` - обработка header и валидация
- `src/applications/applications.service.ts` - передача recipientEmail

### 3. API изменения

#### POST /api/applications
Теперь поддерживает header `X-Recipient-Email` для указания email получателя.

**Заголовки:**
```
X-Recipient-Email: admin@company.com (опционально)
```

**Тело запроса:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+7 (999) 123-45-67",
  "productCategory": "building_frames",
  "productTitle": "Металлические фермы",
  "description": "Описание задачи"
}
```

## Frontend изменения

### 1. Новые файлы
- `src/composables/useEmailConfig.ts` - управление email адресом

### 2. Обновленные файлы
- `src/components/Header.vue` - отображение email из composable
- `src/components/CatalogSection.vue` - отправка email в header
- `src/views/CategoryPage.vue` - отправка email в header и productTitle

### 3. Изменения в формах

#### Форма в каталоге
- Отправляет `productTitle` (название выбранного изделия)
- Отправляет email в header `X-Recipient-Email`

#### Форма в modal-content
- Автоматически определяет `productCategory` из URL
- Автоматически определяет `productTitle` из выбранного товара
- Отправляет email в header `X-Recipient-Email`

## Настройка

### 1. Переменные окружения
Убедитесь, что в `.env` файле настроены:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@company.com
```

### 2. Миграция базы данных
Выполните миграцию для добавления поля productTitle:
```bash
npm run migration:run
```

### 3. Изменение email адреса
Для изменения email адреса в header отредактируйте файл:
`frontend/src/composables/useEmailConfig.ts`

```typescript
const recipientEmail = ref('your-new-email@company.com')
```

## Особенности

### Валидация email
- Проверяется формат email
- Проверяется существование домена через DNS MX записи
- При ошибке валидации возвращается HTTP 400

### Защита от спама
- Ограничение: 1 заявка в минуту с одного email или IP
- При превышении лимита возвращается HTTP 429
- Автоматическая очистка старых записей

### Шаблон письма
- Современный HTML дизайн с градиентами
- Адаптивная верстка
- Эмодзи для лучшего восприятия
- Информация о заявке и клиенте
- Поддержка productTitle

### Обработка ошибок
- Детальные сообщения об ошибках
- Логирование в консоль
- Graceful degradation (не прерывает работу при ошибке email)

## Тестирование

### 1. Тест формы в каталоге
1. Перейдите на главную страницу
2. Заполните форму в секции каталога
3. Выберите категорию и изделие
4. Отправьте заявку
5. Проверьте получение письма

### 2. Тест формы в modal-content
1. Перейдите на страницу категории
2. Нажмите на товар для открытия модального окна
3. Заполните форму
4. Отправьте заявку
5. Проверьте получение письма

### 3. Тест валидации
1. Попробуйте отправить заявку с некорректным email
2. Попробуйте отправить несколько заявок подряд
3. Проверьте сообщения об ошибках

## Логирование

Все операции логируются в консоль:
- ✅ Успешная отправка email
- ❌ Ошибки отправки
- ⚠️ Предупреждения валидации
- 🚫 Блокировки по rate limit
