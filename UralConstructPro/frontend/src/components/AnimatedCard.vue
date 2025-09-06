<template>
  <div 
    class="animated-card" 
    :class="[`card-${variant}`, { 'card-hover': hover }]"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="card-header" v-if="$slots.header">
      <slot name="header" />
    </div>
    
    <div class="card-content">
      <slot />
    </div>
    
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
    
    <div class="card-glow" :class="{ 'glow-active': hover }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'accent' | 'glass'
  elevation?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  elevation: 'md'
})

const hover = ref(false)
</script>

<style scoped>
.animated-card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--gray-100);
  transition: all var(--transition-normal);
  overflow: hidden;
  cursor: pointer;
}

.card-default {
  box-shadow: var(--shadow-md);
}

.card-primary {
  background: var(--primary-50);
  border-color: var(--primary-200);
  box-shadow: var(--shadow-lg);
}

.card-accent {
  background: var(--accent-50);
  border-color: var(--accent-200);
  box-shadow: var(--shadow-lg);
}

.card-glass {
  background: var(--glass-bg);
  backdrop-filter: var(--backdrop-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
}

.card-hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary-color);
}

.card-header {
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid var(--gray-100);
}

.card-content {
  padding: 2rem;
}

.card-footer {
  padding: 1rem 2rem 1.5rem;
  border-top: 1px solid var(--gray-100);
  background: var(--gray-50);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
  border-radius: var(--radius-2xl);
}

.glow-active {
  opacity: 0.1;
}

/* Анимации */
@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animated-card:hover {
  animation: cardFloat 2s ease-in-out infinite;
}

/* Адаптивность */
@media (max-width: 768px) {
  .animated-card {
    border-radius: var(--radius-xl);
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-header {
    padding: 1rem 1.5rem 0.5rem;
  }
  
  .card-footer {
    padding: 0.5rem 1.5rem 1rem;
  }
}
</style> 