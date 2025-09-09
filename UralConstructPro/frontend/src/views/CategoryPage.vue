<template>
  <div class="category-page">
    <Header @scrollToSection="scrollToSection" />
    
    <main class="main-content">
      <!-- Заголовок категории -->
      <section class="category-header">
        <div class="container">
          <div class="breadcrumb">
            <router-link to="/#catalog" class="breadcrumb-link">Главная</router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ categoryData.title }}</span>
          </div>
          
          <div class="category-info">
            <h1 class="category-title">{{ categoryData.title }}</h1>
            <p class="category-description">{{ categoryData.description }}</p>
          </div>
        </div>
      </section>
      
      <!-- Список изделий -->
      <section class="products-section">
        <div class="container">
          <div class="products-grid">
            <div 
              v-for="product in categoryData.products" 
              :key="product.id"
              class="product-card"
              @click="showProductDetails(product)"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.title" class="product-img" />
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.title }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-arrow">
                  <span class="arrow-icon">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
    
    <!-- Модальное окно с деталями изделия -->
    <div v-if="selectedProduct" class="modal-overlay" @click="closeProductDetails">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedProduct.title }}</h3>
          <button @click="closeProductDetails" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="product-details">
            <div class="product-image-large">
              <img :src="selectedProduct.image" :alt="selectedProduct.title" />
            </div>
            <div class="product-info-details">
              <h4>Описание</h4>
              <p>{{ selectedProduct.fullDescription }}</p>
              
              <h4 class="h4_application">Оставить заявку</h4>
              <!-- Интегрированная форма каталога -->
              <form @submit.prevent="submitProductForm" class="contact-form">
                <div class="form-grid">
                  <div class="form-group">
                    <label for="p_name">Ваше имя</label>
                    <input 
                      id="p_name" 
                      v-model="pForm.name" 
                      type="text"
                      placeholder="Введите ваше имя"
                      :class="{ error: pErrors.name }"
                      @input="onPNameInput"
                    />
                    <span v-if="pErrors.name" class="error-message">{{ pErrors.name }}</span>
                  </div>
                  <div class="form-group">
                    <label for="p_email">Email</label>
                    <input 
                      id="p_email" 
                      v-model="pForm.email" 
                      type="email"
                      placeholder="your@email.com"
                      :class="{ error: pErrors.email }"
                    />
                    <span v-if="pErrors.email" class="error-message">{{ pErrors.email }}</span>
                  </div>
                  <div class="form-group">
                    <label for="p_phone">Телефон</label>
                    <input 
                      id="p_phone" 
                      :value="pFormattedPhone" 
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      :class="{ error: pErrors.phone }"
                      @input="onPPhoneInput"
                    />
                    <span v-if="pErrors.phone" class="error-message">{{ pErrors.phone }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="p_desc">Описание задачи</label>
                  <textarea 
                    id="p_desc" 
                    v-model="pForm.description" 
                    rows="4"
                    placeholder="Опишите вашу задачу, требования и особенности проекта..."
                    :class="{ error: pErrors.description }"
                  ></textarea>
                  <span v-if="pErrors.description" class="error-message">{{ pErrors.description }}</span>
                </div>
                <div class="form-actions">
                  <button type="submit" class="submit-btn" :disabled="pLoading">
                    <span v-if="pLoading">Отправка...</span>
                    <span v-else>Отправить заявку</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useApplicationForm } from '@/composables/useApplicationForm'
import { categoriesData, type Product } from '@/data/categories'

const route = useRoute()
const selectedProduct = ref<Product | null>(null)

const categoryData = computed(() => {
  const categoryId = route.params.category as string
  return categoriesData[categoryId] || {
    title: 'Категория не найдена',
    description: '',
    products: []
  }
})

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80 // Высота фиксированного header
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementTop - headerHeight - 20 // 20px дополнительный отступ
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const showProductDetails = (product: Product) => {
  selectedProduct.value = product
}

const closeProductDetails = () => {
  selectedProduct.value = null
}

// Используем composable для формы
const {
  loading: pLoading,
  form: pForm,
  errors: pErrors,
  formattedPhone: pFormattedPhone,
  onPhoneInput: onPPhoneInput,
  onNameInput: onPNameInput,
  submitForm: baseSubmitForm
} = useApplicationForm()

const submitProductForm = async () => {
  const success = await baseSubmitForm({
    productCategory: route.params.category as string,
    productTitle: selectedProduct.value?.title
  })
  
  if (success) {
    closeProductDetails()
  }
}
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: var(--gradient-subtle);
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

/* Заголовок категории */
.category-header {
  background: var(--white);
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--gray-100);
  margin-top: 80px; /* Отступ для фиксированного header */
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: var(--font-size-sm);
  color: var(--gray-600);
}

.breadcrumb-link {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition-normal);
}

.breadcrumb-link:hover {
  color: var(--primary-600);
}

.breadcrumb-separator {
  color: var(--gray-400);
}

.breadcrumb-current {
  color: var(--gray-800);
  font-weight: var(--font-weight-medium);
}

.category-info {
  text-align: center;
}

.category-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--gray-800);
  margin-bottom: 1rem;
}

.category-description {
  font-size: var(--font-size-xl);
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Секция изделий */
.products-section {
  padding: 2rem 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition-normal);
  border: 1px solid var(--gray-100);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary-color);
}

.product-image {
  height: 200px;
  overflow: hidden;
  background: var(--gray-50);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
  position: relative;
}

.product-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-800);
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  line-height: var(--line-height-relaxed);
  margin-bottom: 1rem;
}

.product-arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: var(--primary-color);
  font-size: var(--font-size-xl);
  transition: var(--transition-normal);
}

.product-card:hover .product-arrow {
  transform: translateX(4px);
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
}

.modal-content {
  background: var(--white);
  border-radius: var(--radius-xl);
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-2xl);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--gray-100);
}

.modal-header h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--gray-800);
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--gray-400);
  cursor: pointer;
  transition: var(--transition-normal);
}

.close-btn:hover {
  color: var(--gray-600);
}

.modal-body {
  padding: 2rem;
}

/* Секция изделий в модалке всегда вертикальная */
.product-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.product-image-large {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--gray-50);
}

.product-image-large img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.product-info-details h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-800);
  margin-bottom: 0.5rem;
  margin-top: 3.5rem;
  text-align: center;
}

.product-info-details h4:first-child {
  margin-top: 0;
}

.h4_application {
  border: 0;
  border-top: 3px solid var(--primary-color);
  padding: 2rem 1rem 0 1rem;
  background: transparent;
}

.product-info-details p {
  color: var(--gray-600);
  line-height: var(--line-height-relaxed);
  margin-bottom: 1rem;
}

/* Стили формы как в каталоге */
.contact-form { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; }
.form-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; width: 100%; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; }
.form-group label { font-weight: var(--font-weight-medium); color: var(--gray-700); font-size: var(--font-size-sm); }
.form-group input, .form-group select, .form-group textarea {
  padding: 1rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition-normal);
  background: var(--white);
  color: var(--gray-800);
  width: 100%;
  box-sizing: border-box;
}
.form-group textarea { min-height: 120px; resize: vertical; }
.form-group select { cursor: pointer; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none; border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.form-group input.error, .form-group select.error, .form-group textarea.error {
  border-color: var(--error-color);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
.error-message { color: var(--error-color); font-size: var(--font-size-sm); margin-top: 0.25rem; }
.form-actions { text-align: center; margin-top: 1rem; }
.submit-btn { background: var(--gradient-primary); border: none; padding: 1.25rem 3rem; font-weight: var(--font-weight-semibold); font-size: var(--font-size-lg); color: white; box-shadow: var(--shadow-lg); border-radius: var(--radius-xl); transition: var(--transition-normal); position: relative; overflow: hidden; cursor: pointer; }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.submit-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); transition: var(--transition-normal); }
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--shadow-glow); }
.submit-btn:hover:not(:disabled)::before { left: 100%; }

/* Адаптивность */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .category-title {
    font-size: var(--font-size-3xl);
  }
  
  .category-description {
    font-size: var(--font-size-lg);
  }
  
  .products-grid { grid-template-columns: 1fr; gap: 1rem; }
  .product-details { grid-template-columns: 1fr; gap: 1rem; }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

let toastEl: HTMLDivElement | null = null
let toastTimer: number | null = null

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  if (!toastEl) {
    toastEl = document.createElement('div')
    toastEl.style.position = 'fixed'
    toastEl.style.top = '20px'
    toastEl.style.right = '20px'
    toastEl.style.zIndex = '9999'
    toastEl.style.background = 'white'
    toastEl.style.border = '1px solid #e5e7eb'
    toastEl.style.borderRadius = '12px'
    toastEl.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)'
    toastEl.style.padding = '12px 16px'
    toastEl.style.color = '#1f2937'
    toastEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease'
    toastEl.style.opacity = '0'
    toastEl.style.transform = 'translateY(-8px)'
    document.body.appendChild(toastEl)
  }
  toastEl.textContent = message
  toastEl.style.borderColor = type === 'success' ? '#16a34a' : '#ef4444'

  toastEl.style.display = 'block'
  // animate in
  requestAnimationFrame(() => {
    if (toastEl) {
      toastEl.style.opacity = '1'
      toastEl.style.transform = 'translateY(0)'
    }
  })
  if (toastTimer) window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    if (toastEl) {
      toastEl.style.opacity = '0'
      toastEl.style.transform = 'translateY(-8px)'
      window.setTimeout(() => {
        if (toastEl) toastEl.style.display = 'none'
      }, 250)
    }
  }, 3000)
}

export default defineComponent({})
</script>