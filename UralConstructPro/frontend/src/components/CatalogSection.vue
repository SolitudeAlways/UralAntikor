<template>
  <section id="catalog" class="catalog-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Каталог продукции</h2>
        <p class="section-subtitle">
          Выберите нужную категорию и оставьте заявку на расчет
        </p>
      </div>
      
      <div class="catalog-content">
        <div class="catalog-categories">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-item"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <div class="category-image">
              <img :src="category.image" :alt="category.title" class="category-img" />
            </div>
            <div class="category-info">
              <h3>{{ category.title }}</h3>
              <p>{{ category.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="catalog-form">
          <div class="form-header">
            <h3>Оставить заявку</h3>
            <p>Заполните форму и мы свяжемся с вами в ближайшее время</p>
          </div>
          
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="name">Ваше имя</label>
                <input 
                  id="name"
                  v-model="form.name" 
                  type="text"
                  placeholder="Введите ваше имя"
                  :class="{ 'error': errors.name }"
                  @input="onNameInput"
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  id="email"
                  v-model="form.email" 
                  type="email"
                  placeholder="your@email.com"
                  :class="{ 'error': errors.email }"
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              
              <div class="form-group">
                <label for="phone">Телефон</label>
                <input 
                  id="phone"
                  :value="formattedPhone" 
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  :class="{ 'error': errors.phone }"
                  @input="onPhoneInput"
                />
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
              
              <div class="form-group">
                <label for="category">Категория изделия</label>
                <select 
                  id="category"
                  v-model="form.productCategory"
                  :class="{ 'error': errors.productCategory }"
                  @change="onCategoryChange"
                >
                  <option value="">Выберите категорию</option>
                  <option 
                    v-for="category in categories" 
                    :key="category.id" 
                    :value="category.id"
                  >
                    {{ category.title }}
                  </option>
                </select>
                <span v-if="errors.productCategory" class="error-message">{{ errors.productCategory }}</span>
              </div>

              <div class="form-group">
                <label for="product">Выберите изделие</label>
                <select 
                  id="product"
                  v-model="form.product"
                  :disabled="!form.productCategory"
                  :class="{ 'error': errors.product }"
                >
                  <option value="">Сначала выберите категорию</option>
                  <option v-for="p in productOptions" :key="p" :value="p">{{ p }}</option>
                </select>
                <span v-if="errors.product" class="error-message">{{ errors.product }}</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="description">Описание задачи</label>
              <textarea 
                id="description"
                v-model="form.description" 
                rows="4"
                placeholder="Опишите вашу задачу, требования и особенности проекта..."
                :class="{ 'error': errors.description }"
              ></textarea>
              <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
            </div>
            
            <div class="form-actions">
              <button 
                type="submit" 
                class="submit-btn"
                :disabled="loading"
              >
                <span v-if="loading">Отправка...</span>
                <span v-else>Отправить заявку</span>
              </button>
            </div>
          </form>
        </div>
      </div>
     
      <!-- Фичи каталога (под контентом) -->
      <div class="catalog-features">
        <div class="feature-item">
          <div class="feature-icon">🏭</div>
          <div class="feature-content">
            <h3>Собственное производство</h3>
            <p>Современное оборудование и полный цикл производства</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <div class="feature-content">
            <h3>Быстрые сроки</h3>
            <p>Выполняем заказы в кратчайшие сроки без потери качества</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🛡️</div>
          <div class="feature-content">
            <h3>Гарантия качества</h3>
            <p>Все изделия проходят строгий контроль качества</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Тост-уведомление -->
    <transition name="toast-fade">
      <div v-show="toastVisible" class="toast" :class="toastType">
        {{ toastMessage }}
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useApplicationForm } from '@/composables/useApplicationForm'
import { categories, categoryIdToProductsMap } from '@/data/categories'

const router = useRouter()
const route = useRoute()
const selectedCategory = ref('')

// Используем composable для формы
const {
  loading,
  form,
  errors,
  formattedPhone,
  toastVisible,
  toastMessage,
  toastType,
  onPhoneInput,
  onNameInput,
  submitForm: baseSubmitForm
} = useApplicationForm()

const productOptions = computed(() => {
  return form.productCategory ? (categoryIdToProductsMap[form.productCategory] || []) : []
})

const onCategoryChange = () => {
  // при смене категории очищаем изделие
  form.product = ''
}

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  // Переход на страницу категории
  router.push(`/category/${categoryId}`)
}

// Предзаполнение формы при возврате с страницы категории
onMounted(() => {
  if (route.query.category) {
    const categoryId = route.query.category as string
    selectedCategory.value = categoryId
    form.productCategory = categoryId
  }
  
  if (route.query.product) {
    const productIdOrName = String(route.query.product)
    // Пытаемся найти по названию среди опций
    const opts = categoryIdToProductsMap[form.productCategory] || []
    if (opts.includes(productIdOrName)) {
      form.product = productIdOrName
    }
  }
})

const submitForm = async () => {
  const success = await baseSubmitForm()
  if (success) {
    selectedCategory.value = ''
  }
}
</script>

<style scoped>
.catalog-section {
  padding: var(--section-padding);
  background: var(--white);
  position: relative;
  overflow: hidden;
}

.catalog-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--accent-50) 100%);
  opacity: 0.3;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--gray-800);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: var(--font-size-xl);
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

.catalog-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: stretch; /* растягиваем колонки на одинаковую высоту */
}

.catalog-categories {
  display: flex;
  flex-direction: column;
  gap: 1.44rem;
  height: 100%;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--white);
  border-radius: var(--radius-xl);
  border: 2px solid var(--gray-100);
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.category-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  transform: scaleY(0);
  transition: var(--transition-normal);
}

.category-item:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.category-item:hover::before {
  transform: scaleY(1);
}

.category-item.active {
  border-color: var(--primary-color);
  background: var(--primary-50);
  box-shadow: var(--shadow-lg);
}

.category-item.active::before {
  transform: scaleY(1);
}

.category-image {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  box-shadow: var(--shadow-md);
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-info h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-800);
  margin-bottom: 0.25rem;
}

.category-info p {
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  line-height: var(--line-height-relaxed);
}

.catalog-form {
  background: var(--white);
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-2xl);
  padding: 3rem;
  border: 1px solid var(--gray-100);
  position: relative;
  overflow: hidden;
  backdrop-filter: var(--backdrop-blur);
  max-width: 100%;
  box-sizing: border-box;
  height: 100%; /* растягиваем форму на высоту колонки */
  display: flex;
  flex-direction: column;
  min-height: 0; /* позволяет flex-элементу сжиматься */
}

.catalog-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--gradient-primary);
}

.catalog-form::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: var(--primary-100);
  border-radius: 50%;
  opacity: 0.1;
  transform: translate(50%, -50%);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h3 {
  color: var(--gray-800);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--gray-600);
  font-size: var(--font-size-base);
}

.contact-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1; /* форма занимает доступную высоту внутри карточки */
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr; /* одна колонка: поля друг под другом */
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.form-group label {
  font-weight: var(--font-weight-medium);
  color: var(--gray-700);
  font-size: var(--font-size-sm);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition-normal);
  background: var(--white);
  color: var(--gray-800);
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-group select {
  cursor: pointer;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: var(--error-color);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: var(--error-color);
  font-size: var(--font-size-sm);
  margin-top: 0.25rem;
}

.form-actions {
  text-align: center;
}

.submit-btn {
  background: var(--gradient-primary);
  border: none;
  padding: 1.25rem 3rem;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  color: white;
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-xl);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: var(--transition-normal);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.submit-btn:hover:not(:disabled)::before {
  left: 100%;
}

/* Тост-уведомление */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background: var(--white);
  color: var(--gray-800);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
  padding: 0.75rem 1rem;
}
.toast.success { border-color: #16a34a; }
.toast.error { border-color: #ef4444; }

/* Плавное появление/исчезновение */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Фичи каталога */
.catalog-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
}

.catalog-features .feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1rem;
  background: var(--white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-100);
  transition: var(--transition-normal);
      background: var(--white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-2xl);
    border: 1px solid var(--gray-100);
    backdrop-filter: var(--backdrop-blur);
  box-shadow: var(--shadow-sm);
}

.catalog-features .feature-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-color);
  background: var(--primary-50);
}

.catalog-features .feature-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.catalog-features .feature-content h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-800);
  margin-bottom: 0.5rem;
}

.catalog-features .feature-content p {
  color: var(--gray-600);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .catalog-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: var(--font-size-3xl);
  }
  
  .section-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .catalog-form {
    padding: 2rem;
    margin: 0 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-header h3 {
    font-size: var(--font-size-xl);
  }
  
  .submit-btn {
    width: 100%;
    padding: 1rem 2rem;
  }
  
  .category-item {
    padding: 1rem;
  }
  
  .category-image {
    width: 50px;
    height: 50px;
  }
  
  .category-info h3 {
    font-size: var(--font-size-base);
  }
  
  .category-info p {
    font-size: var(--font-size-xs);
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.875rem;
    font-size: var(--font-size-base);
  }

  .catalog-features {
    grid-template-columns: 1fr;
  }
}
</style> 