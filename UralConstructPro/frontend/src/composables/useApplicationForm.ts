import { ref, reactive, computed } from 'vue'
import { validateForm, applicationValidationRules, sanitizeText, type ValidationErrors } from '@/utils/validation'
import { applicationsApi, type ApplicationData } from '@/api/applications'

export function useApplicationForm() {
  const loading = ref(false)
  const toastVisible = ref(false)
  const toastMessage = ref('')
  const toastType = ref<'success' | 'error'>('success')

  const form = reactive({
    name: '',
    email: '',
    phone: '',
    productCategory: '',
    product: '',
    description: ''
  })

  const errors = reactive<ValidationErrors>({
    name: '',
    email: '',
    phone: '',
    productCategory: '',
    product: '',
    description: ''
  })

  // Маска телефона (сохраняем оригинальную логику)
  const formatPhone = (digits: string): string => {
    const d = (digits || '').replace(/\D/g, '')
    if (!d) return ''
    const parts: string[] = []
    parts.push('+', d.substring(0, 1))
    if (d.length > 1) {
      const a = d.substring(1, 4)
      parts.push(' ', '(', a)
      if (a.length === 3) parts.push(')')
    }
    if (d.length > 4) {
      const b = d.substring(4, 7)
      parts.push(' ', b)
    }
    if (d.length > 7) {
      const c = d.substring(7, 9)
      parts.push('-', c)
    }
    if (d.length > 9) {
      const e2 = d.substring(9, 11)
      parts.push('-', e2)
    }
    return parts.join('')
  }

  const formattedPhone = computed(() => formatPhone(form.phone))

  const onPhoneInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const onlyDigits = target.value.replace(/\D/g, '').slice(0, 11)
    form.phone = onlyDigits
  }

  const onNameInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const filtered = target.value.replace(/[^A-Za-zА-Яа-яЁё\s\-]/g, '')
    form.name = filtered
  }

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toastType.value = type
    toastMessage.value = message
    toastVisible.value = true
    setTimeout(() => { toastVisible.value = false }, type === 'error' ? 3500 : 3000)
  }

  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.productCategory = ''
    form.product = ''
    form.description = ''
    
    Object.keys(errors).forEach(key => {
      errors[key as keyof typeof errors] = ''
    })
  }

  const submitForm = async (additionalData: Partial<ApplicationData> = {}) => {
    // Очищаем предыдущие ошибки
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })
    
    // Санитизируем данные (сохраняем оригинальную логику)
    const sanitizedForm: ApplicationData = {
      name: sanitizeText(form.name),
      email: form.email.trim(),
      phone: form.phone,
      productCategory: form.productCategory,
      productTitle: sanitizeText(form.product),
      description: sanitizeText(form.description),
      ...additionalData
    }
    
    // Валидируем форму (сохраняем оригинальную логику)
    const validationErrors = validateForm(sanitizedForm, applicationValidationRules)
    
    if (Object.keys(validationErrors).length > 0) {
      Object.assign(errors, validationErrors)
      return false
    }
    
    try {
      loading.value = true
      
      await applicationsApi.createApplication(sanitizedForm)
      
      showToast('Заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success')
      resetForm()
      return true
    } catch (error: any) {
      console.error('Ошибка отправки заявки:', error)
      showToast(error.response?.data?.message || 'Ошибка отправки заявки', 'error')
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    // Состояние
    loading,
    form,
    errors,
    formattedPhone,
    toastVisible,
    toastMessage,
    toastType,
    
    // Методы
    onPhoneInput,
    onNameInput,
    submitForm,
    showToast,
    resetForm
  }
}
