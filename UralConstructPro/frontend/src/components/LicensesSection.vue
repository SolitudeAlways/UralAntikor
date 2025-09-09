<template>
  <section id="licenses" class="licenses-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Лицензии и сертификаты</h2>
        <p class="section-subtitle">
          Наши документы подтверждают качество и соответствие стандартам
        </p>
      </div>
      
      <div class="licenses-grid">
        <div 
          v-for="(license, index) in licenses" 
          :key="index"
          class="license-item"
          @click="openModal(index)"
        >
          <div class="license-image">
            <img :src="license.image" :alt="license.title" class="license-img" />
            <div class="overlay">
              <div class="zoom-icon">🔍</div>
            </div>
          </div>
          <div class="license-info">
            <h3>{{ license.title }}</h3>
            <p>{{ license.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно для увеличенного изображения -->
    <el-dialog 
      v-model="showModal" 
      :title="currentLicense?.title"
      width="700px"
      center
      class="license-modal"
    >
      <div class="modal-content">
        <div class="modal-image">
          <img :src="currentLicense?.image" :alt="currentLicense?.title" class="modal-img" />
        </div>
      </div>
      <template #footer>
        <div class="modal-footer">
          <el-button @click="prevLicense" :disabled="currentIndex === 0">
            ← Предыдущий
          </el-button>
          <span class="image-counter">{{ currentIndex + 1 }} из {{ licenses.length }}</span>
          <el-button @click="nextLicense" :disabled="currentIndex === licenses.length - 1">
            Следующий →
          </el-button>
        </div>
      </template>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const showModal = ref(false)
const currentIndex = ref(0)

const licenses = [
  {
    title: 'Лицензия на производство',
    description: 'Разрешение на изготовление металлоконструкций',
    image: '/img/zaglushka.svg'
  },
  {
    title: 'Сертификат качества ISO 9001',
    description: 'Международный стандарт управления качеством',
    image: '/img/zaglushka.svg'
  },
  {
    title: 'Сертификат безопасности',
    description: 'Соответствие требованиям промышленной безопасности',
    image: '/img/zaglushka.svg'
  },
  {
    title: 'Лицензия СРО',
    description: 'Саморегулируемая организация строителей',
    image: '/img/zaglushka.svg'
  },
  {
    title: 'Сертификат соответствия',
    description: 'Соответствие техническим регламентам',
    image: '/img/zaglushka.svg'
  }
]

const currentLicense = computed(() => licenses[currentIndex.value])

const openModal = (index: number) => {
  currentIndex.value = index
  showModal.value = true
}

const nextLicense = () => {
  if (currentIndex.value < licenses.length - 1) {
    currentIndex.value++
  }
}

const prevLicense = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>

<style scoped>
.licenses-section {
  padding: var(--section-padding);
  background: var(--gradient-light);
  position: relative;
  overflow: hidden;
}

.licenses-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-50) 0%, var(--primary-50) 100%);
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

.licenses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.license-item {
  background: var(--white);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-100);
  transition: var(--transition-normal);
  cursor: pointer;
  position: relative;
}

.license-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: var(--transition-normal);
}

.license-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary-color);
}

.license-item:hover::before {
  transform: scaleX(1);
}

.license-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.license-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-normal);
}

.license-item:hover .overlay {
  opacity: 1;
}

.zoom-icon {
  font-size: 2rem;
  color: white;
}

.license-info {
  padding: 1.5rem;
}

.license-info h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-800);
  margin-bottom: 0.5rem;
}

.license-info p {
  color: var(--gray-600);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

/* Модальное окно */
.license-modal {
  border-radius: var(--radius-xl);
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* фиксированная высота */
  width: 100%;
}

.modal-image {
  width: 100%;
  height: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* сохраняет пропорции, помещает изображение целиком */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
}

.placeholder-large {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem;
  background: var(--gray-50);
  border-radius: var(--radius-xl);
  border: 2px dashed var(--gray-300);
  color: var(--gray-500);
}

.placeholder-icon-large {
  font-size: 5rem;
}

.placeholder-text-large {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  text-align: center;
}

.placeholder-description {
  font-size: var(--font-size-lg);
  text-align: center;
  color: var(--gray-600);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.image-counter {
  font-weight: var(--font-weight-medium);
  color: var(--gray-600);
}

/* Адаптивность */
@media (max-width: 1024px) {
  /* Адаптивность для модального окна на планшетах */
  .modal-content {
    height: 400px;
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
  
  .licenses-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .license-image {
    height: 150px;
  }
  
  .license-img {
    height: 100%;
  }
  
  .placeholder-icon {
    font-size: 2.5rem;
  }
  
  .placeholder-text {
    font-size: var(--font-size-base);
  }
  
  .license-info {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
    gap: 1rem;
  }
  
  .placeholder-large {
    padding: 2rem;
  }
  
  .placeholder-icon-large {
    font-size: 3rem;
  }
  
  .placeholder-text-large {
    font-size: var(--font-size-xl);
  }
  
  /* Адаптивность для модального окна */
  .modal-content {
    height: 300px;
  }
  
  .modal-image {
    max-width: 100%;
  }
}
</style> 