<template>
  <span class="animated-counter" :data-target="target">
    {{ prefix }}{{ currentValue }}{{ suffix }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
  prefix: '',
  suffix: ''
})

const currentValue = ref(0)

const animateCounter = () => {
  const startTime = Date.now()
  const startValue = 0
  
  const updateCounter = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Используем easeOutQuart для плавной анимации
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    currentValue.value = Math.floor(startValue + (props.target - startValue) * easeOutQuart)
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }
  
  updateCounter()
}

onMounted(() => {
  // Запускаем анимацию при появлении элемента в viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter()
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })
  
  observer.observe(document.querySelector('.animated-counter')!)
})

watch(() => props.target, () => {
  animateCounter()
})
</script>

<style scoped>
.animated-counter {
  display: inline-block;
  font-weight: var(--font-weight-bold);
  transition: var(--transition-normal);
}

.animated-counter:hover {
  transform: scale(1.05);
}
</style> 