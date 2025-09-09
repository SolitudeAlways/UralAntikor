// Утилиты для валидации форм
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  custom?: (value: string) => string | null;
}

export interface ValidationErrors {
  [key: string]: string;
}

// Основная функция валидации
export function validateField(value: string, rules: ValidationRule): string | null {
  if (rules.required && (!value || value.trim() === '')) {
    return 'Поле обязательно для заполнения';
  }

  if (!value || value.trim() === '') {
    return null; // Если поле не обязательное и пустое, пропускаем
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Минимум ${rules.minLength} символов`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Максимум ${rules.maxLength} символов`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Некорректный формат';
  }

  if (rules.email && !isValidEmail(value)) {
    return 'Некорректный email адрес';
  }

  if (rules.phone && !isValidPhone(value)) {
    return 'Некорректный номер телефона';
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}

// Валидация email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Валидация телефона
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Санитизация текста
export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '') // Удаляем потенциально опасные символы
    .replace(/javascript:/gi, '') // Удаляем javascript: ссылки
    .replace(/on\w+=/gi, '') // Удаляем обработчики событий
    .trim();
}

// Валидация формы
export function validateForm(data: Record<string, string>, rules: Record<string, ValidationRule>): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const [field, value] of Object.entries(data)) {
    if (rules[field]) {
      const error = validateField(value, rules[field]);
      if (error) {
        errors[field] = error;
      }
    }
  }

  return errors;
}

// Правила валидации для форм заявок
export const applicationValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    custom: (value: string) => {
      const sanitized = sanitizeText(value);
      if (sanitized !== value) {
        return 'Недопустимые символы в имени';
      }
      return null;
    }
  },
  email: {
    required: true,
    email: true,
    maxLength: 100
  },
  phone: {
    required: true,
    phone: true,
    custom: (value: string) => {
      const sanitized = sanitizeText(value);
      if (sanitized !== value) {
        return 'Недопустимые символы в телефоне';
      }
      return null;
    }
  },
  productCategory: {
    required: true
  },
  product: {
    required: true,
    minLength: 2,
    maxLength: 100,
    custom: (value: string) => {
      const sanitized = sanitizeText(value);
      if (sanitized !== value) {
        return 'Недопустимые символы в названии изделия';
      }
      return null;
    }
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    custom: (value: string) => {
      const sanitized = sanitizeText(value);
      if (sanitized !== value) {
        return 'Недопустимые символы в описании';
      }
      return null;
    }
  }
};
