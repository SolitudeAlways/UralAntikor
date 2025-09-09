import { ref } from 'vue'

// Email адрес для отправки заявок (можно изменить в header)
const recipientEmail = ref('mihuil.chugunov@mail.ru')

export function useEmailConfig() {
  const setRecipientEmail = (email: string) => {
    recipientEmail.value = email
  }

  const getRecipientEmail = () => {
    return recipientEmail.value
  }

  return {
    recipientEmail: recipientEmail.value,
    setRecipientEmail,
    getRecipientEmail
  }
}
