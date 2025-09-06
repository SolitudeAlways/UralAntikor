<template>
  <section class="parallax-section" :style="parallaxStyle">
    <div class="parallax-content" :style="contentStyle">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  speed?: number
  background?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  speed: 0.5,
  background: 'var(--gradient-primary)',
  height: '400px'
})

const scrollY = ref(0)

const parallaxStyle = computed(() => ({
  background: props.background,
  height: props.height,
  transform: `translateY(${scrollY.value * props.speed}px)`
}))

const contentStyle = computed(() => ({
  transform: `translateY(${-scrollY.value * (1 - props.speed)}px)`
}))

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.parallax-section {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--white);
  padding: 2rem;
}

.parallax-content h2 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.parallax-content p {
  font-size: var(--font-size-xl);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}
</style> 