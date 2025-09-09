<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2 class="section-title">О компании</h2>
          <p class="section-subtitle">
            УралАнтикор - ведущее предприятие по производству металлоконструкций на Урале
          </p>
          
          <div class="about-description">
            <p>
              Мы специализируемся на производстве высококачественных металлоконструкций для промышленности, 
              строительства и инфраструктурных проектов. Наша компания имеет многолетний опыт работы 
              и использует современные технологии производства.
            </p>
            
            <p>
              Мы предлагаем полный цикл услуг: от проектирования и изготовления до монтажа и технической поддержки. 
              Наши изделия соответствуют всем стандартам качества и безопасности.
            </p>
          </div>
        </div>
        
        <div class="about-visual">
          <img class="about-img" :src="about" alt="О компании" />
          <div class="stats-overlay">
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">Лет опыта</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Реализованных проектов</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Техподдержка</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Гарантия качества</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import about from '/img/about.jpg'
</script>

<style scoped>
.about-section {
  padding: var(--section-padding);
  background: var(--gradient-light);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, var(--white), transparent);
}

.about-section::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: var(--primary-100);
  border-radius: 50%;
  opacity: 0.3;
  transform: translateY(-50%);
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr; /* слева текст, справа картинка+статы */
  gap: 4rem;
  position: relative;
  z-index: 2;
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  line-height: var(--line-height-relaxed);
}

.about-description {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-description p {
  color: var(--gray-700);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-lg);
}

/* Фичи под текстом (левая колонка) */
.about-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-100);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-color);
  background: var(--primary-50);
}

.feature-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-content h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--gray-800);
  margin-bottom: 0.5rem;
}

.feature-content p {
  color: var(--gray-600);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

/* Правая колонка: картинка сверху, статы ниже */
.about-visual {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2rem;
}

.about-img {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
}

.stats-overlay {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  padding: 2.5rem;
  background: var(--white);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  backdrop-filter: var(--backdrop-blur);
  position: relative;
  overflow: hidden;
  transition: var(--transition-normal);
}

.stats-overlay::before {
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

.stats-overlay:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary-color);
  background: var(--primary-50);
}

.stats-overlay:hover::before {
  transform: scaleX(1);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  font-weight: var(--font-weight-medium);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .stats-overlay {
    max-width: 100%;
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
  
  .about-description p {
    font-size: var(--font-size-base);
  }
  
  .stats-overlay {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style> 