<template>
  <section id="production" class="production-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Фотографии производства</h2>
        <p class="section-subtitle">
          Современное оборудование и технологии изготовления металлоконструкций
        </p>
      </div>
      
      <div class="production-grid">
        <div 
          v-for="(item, index) in productionItems" 
          :key="index"
          class="production-item"
          :class="`item-${index + 1}`"
          @click="openModal(index)"
        >
          <div class="production-image">
            <img :src="item.image" :alt="item.title" class="production-img" />
            <div class="overlay">
              <div class="overlay-content">
                <div class="zoom-icon">🔍</div>
              </div>
            </div>
          </div>
          <div class="production-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="production-stats">
        <div class="stat-item">
          <div class="stat-number">50+</div>
          <div class="stat-label">Единиц оборудования</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">1000м²</div>
          <div class="stat-label">Производственная площадь</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Режим работы</div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно для увеличенного изображения -->
    <el-dialog 
      v-model="showModal" 
      :title="currentItem?.title"
      width="90%"
      center
      class="production-modal"
    >
      <div class="modal-content">
        <div class="modal-image">
          <img :src="currentItem?.image" :alt="currentItem?.title" class="modal-img" />
        </div>
      </div>
      <template #footer>
        <div class="modal-footer">
          <el-button @click="prevItem" :disabled="currentIndex === 0">
            ← Предыдущий
          </el-button>
          <span class="image-counter">{{ currentIndex + 1 }} из {{ productionItems.length }}</span>
          <el-button @click="nextItem" :disabled="currentIndex === productionItems.length - 1">
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

const productionItems = [
  {
    icon: '🏭',
    title: 'Лазерный станок',
    description: 'METORN (МЕТОРН) 1500*3000',
    image: '/img/production/laser.jpg'
  },
  {
    icon: '🔧',
    title: 'Сварочное производство',
    description: 'Автоматизированные сварочные линии и ручная сварка',
    image: '/img/production/proizvodstvo.jpg'
  },
  {
    icon: '⚙️',
    title: 'Маленький ленточнопильный станок',
    description: 'Stalex BS-1018B',
    image: '/img/production/saw.bmp'
  },
  {
    icon: '🎨',
    title: 'Пеллетный котел',
    description: 'FACI 455',
    image: '/img/production/bake.jpeg'
  },
  {
    icon: '📦',
    title: 'Большой ленточнопильный станок',
    description: 'Stalex BS-2114Т',
    image: '/img/production/lentopil-mini.bmp'
  },
  {
    icon: '🔬',
    title: 'Винтовой компрессор',
    description: 'Magnus AE1-15ATD LD 16 IP55',
    image: '/img/production/compressor.jpeg'
  }
]

const currentItem = computed(() => productionItems[currentIndex.value])

const openModal = (index: number) => {
  currentIndex.value = index
  showModal.value = true
}

const nextItem = () => {
  if (currentIndex.value < productionItems.length - 1) {
    currentIndex.value++
  }
}

const prevItem = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>

<style scoped>
.production-section {
  padding: var(--section-padding);
  background: var(--white);
  position: relative;
  overflow: hidden;
}

.production-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-50) 0%, var(--primary-50) 100%);
  opacity: 0.3;
}

.production-section::after {
  content: '';
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: var(--accent-100);
  border-radius: 50%;
  opacity: 0.2;
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

.production-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.production-item {
  background: var(--white);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-100);
  transition: var(--transition-normal);
  cursor: pointer;
  position: relative;
}

.production-item::before {
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

.production-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary-color);
}

.production-item:hover::before {
  transform: scaleX(1);
}

.production-image {
  position: relative;
  height: 250px;
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.production-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);
}

.production-item:hover .production-img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-normal);
}

.production-item:hover .overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.zoom-icon {
  font-size: 2rem;
  color: white;
}

.production-info {
  padding: 1.5rem;
}

.production-info h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-800);
  margin-bottom: 0.5rem;
}

.production-info p {
  color: var(--gray-600);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

.production-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.stat-item {
  text-align: center;
  padding: 2.5rem;
  background: var(--white);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--gray-100);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.stat-item::before {
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

.stat-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary-color);
  background: var(--primary-50);
}

.stat-item:hover::before {
  transform: scaleX(1);
}

.stat-number {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  display: block;
}

.stat-label {
  font-size: var(--font-size-base);
  color: var(--gray-700);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Специальные стили для разных элементов */
.item-1 .production-image {
  background: linear-gradient(135deg, #e6f3ff 0%, #f0f7ff 100%);
}

.item-2 .production-image {
  background: linear-gradient(135deg, #fff5e6 0%, #fff8f0 100%);
}

.item-3 .production-image {
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f3ff 100%);
}

.item-4 .production-image {
  background: linear-gradient(135deg, #fff0f0 0%, #fff5f5 100%);
}

.item-5 .production-image {
  background: linear-gradient(135deg, #f0fff0 0%, #f5fff5 100%);
}

.item-6 .production-image {
  background: linear-gradient(135deg, #f8f0ff 0%, #f5f0ff 100%);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .production-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
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
  
  .production-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .production-image {
    height: 200px;
  }
  
  .placeholder-icon {
    font-size: 3rem;
  }
  
  .placeholder-text {
    font-size: var(--font-size-base);
  }
  
  .production-info {
    padding: 1rem;
  }
  
  .production-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stat-item {
    padding: 1.5rem;
  }
  
  .stat-number {
    font-size: var(--font-size-3xl);
  }
  
  /* Адаптивность для модального окна */
  .modal-content {
    height: 300px;
  }
  
  .modal-image {
    max-width: 100%;
  }
}

/* Модальное окно */
.production-modal {
  border-radius: var(--radius-xl);
}

/* Переопределение ширины Element UI Dialog */
.production-modal .el-dialog {
  width: 90% !important;
  max-width: 800px;
  margin: 0 auto;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* фиксированная высота */
  width: 100%;
  padding: 1rem;
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
  overflow: hidden;
}

.modal-img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* сохраняет пропорции, помещает изображение целиком */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.image-counter {
  font-size: var(--font-size-base);
  color: var(--gray-600);
  font-weight: var(--font-weight-medium);
}

/* Адаптация для планшетов */
@media (max-width: 768px) {
  .production-modal .el-dialog {
    width: 95% !important;
    max-width: none;
  }
  
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-content {
    height: 80vh;
    max-height: 80vh;
    padding: 0.5rem;
    overflow: hidden;
  }
  
  .modal-image {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    border-radius: var(--radius-md);
  }
  
  .modal-img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    border-radius: var(--radius-md);
  }
}

/* Адаптация для маленьких планшетов и больших телефонов */
@media (max-width: 700px) {
  .production-modal .el-dialog {
    width: 98% !important;
    max-width: none;
  }
  
  .modal-overlay {
    padding: 0.2rem;
  }
  
  .modal-content {
    height: 75vh;
    max-height: 75vh;
    padding: 0.2rem;
    overflow: hidden;
  }
  
  .modal-image {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }
  
  .modal-img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    border-radius: var(--radius-sm);
  }
}

/* Адаптация для телефонов */
@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.1rem;
  }
  
  .modal-content {
    height: 80vh;
    max-height: 80vh;
    padding: 0.1rem;
    overflow: hidden;
  }
  
  .modal-image {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }
  
  .modal-img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    border-radius: var(--radius-sm);
  }
}

/* Адаптация для маленьких телефонов */
@media (max-width: 375px) {
  .modal-overlay {
    padding: 0.05rem;
  }
  
  .modal-content {
    height: 75vh;
    max-height: 75vh;
    padding: 0.05rem;
  }
  
  .modal-image {
    border-radius: var(--radius-xs);
  }
  
  .modal-img {
    border-radius: var(--radius-xs);
  }
}

/* Адаптация для очень маленьких экранов */
@media (max-width: 320px) {
  .modal-overlay {
    padding: 0.025rem;
  }
  
  .modal-content {
    height: 70vh;
    max-height: 70vh;
    padding: 0.025rem;
  }
}
</style> 