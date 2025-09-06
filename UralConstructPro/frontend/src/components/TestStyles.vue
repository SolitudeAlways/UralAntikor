<template>
  <div class="test-styles">
    <h1 class="gradient-text">Тест стилей</h1>
    
    <div class="test-cards">
      <div class="test-card glass-effect">
        <h3>Glassmorphism эффект</h3>
        <p>Этот элемент должен иметь полупрозрачный фон с размытием</p>
      </div>
      
      <div class="test-card hover-lift">
        <h3>Hover эффект</h3>
        <p>Наведите курсор - элемент должен подняться</p>
      </div>
      
      <div class="test-card animate-float">
        <h3>Анимация</h3>
        <p>Этот элемент должен плавно двигаться</p>
      </div>
    </div>
    
    <div class="test-buttons">
      <button class="btn btn-primary">Основная кнопка</button>
      <button class="btn btn-secondary">Вторичная кнопка</button>
      <button class="btn btn-accent">Акцентная кнопка</button>
    </div>
    
    <div class="test-colors">
      <div class="color-box primary">Primary</div>
      <div class="color-box secondary">Secondary</div>
      <div class="color-box accent">Accent</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Тестовый компонент
</script>

<style scoped>
.test-styles {
  padding: 2rem;
  background: var(--gradient-light);
  min-height: 100vh;
}

.test-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.test-card {
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-200);
  transition: var(--transition-normal);
}

.test-card h3 {
  color: var(--gray-800);
  margin-bottom: 1rem;
}

.test-card p {
  color: var(--gray-600);
}

.test-buttons {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.test-colors {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.color-box {
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  color: white;
  font-weight: var(--font-weight-semibold);
}

.color-box.primary {
  background: var(--primary-color);
}

.color-box.secondary {
  background: var(--secondary-color);
}

.color-box.accent {
  background: var(--accent-color);
}
</style> 