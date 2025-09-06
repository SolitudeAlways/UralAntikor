<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="brand">
          <img src="/img/header/logo3 (1).png" alt="Логотип" class="logo-img" />
        </div>

        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item"><router-link to="/" class="nav-link">Главная</router-link></li>
            <li class="nav-item"><a href="#about" class="nav-link">О нас</a></li>
            <li class="nav-item"><a href="#catalog" class="nav-link">Каталог</a></li>
            <li class="nav-item"><a href="#licenses" class="nav-link">Лицензии</a></li>
            <li class="nav-item"><a href="#production" class="nav-link">Производство</a></li>
          </ul>
        </nav>

        <div class="header-contacts">
          <a href="tel:+79991234567" class="contact-link">+7 (999) 123-45-67</a>
          <a href="mailto:info@example.com" class="contact-link">info@example.com</a>
        </div>

        <!-- Кнопка бургер (справа) -->
        <button class="burger" :aria-expanded="isMenuOpen ? 'true' : 'false'" @click="toggleMenu" aria-label="Открыть меню">
          <svg v-if="!isMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Оверлей для клика вне меню -->
      <div v-if="isMobile && isMenuOpen" class="menu-overlay" @click="closeMenu"></div>

      <!-- Мобильное меню рисуем внутри header, сразу под контентом -->
      <transition name="menu-fade">
        <div v-if="isMobile && isMenuOpen" class="mobile-menu">
          <ul class="nav-list mobile-list">
            <li class="nav-item" @click="closeMenu"><router-link to="/" class="nav-link">Главная</router-link></li>
            <li class="nav-item" @click="closeMenu"><a href="#about" class="nav-link">О нас</a></li>
            <li class="nav-item" @click="closeMenu"><a href="#catalog" class="nav-link">Каталог</a></li>
            <li class="nav-item" @click="closeMenu"><a href="#licenses" class="nav-link">Лицензии</a></li>
            <li class="nav-item" @click="closeMenu"><a href="#production" class="nav-link">Производство</a></li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isMobile = ref(false)

const toggleMenu = () => { if (isMobile.value) isMenuOpen.value = !isMenuOpen.value }
const closeMenu = () => { isMenuOpen.value = false }

const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }
const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) closeMenu()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', handleResize)
})

defineEmits<{
  scrollToSection: [section: string]
}>()
</script>

<style scoped>
:root { --header-height: 220px; }
.header { position: relative; background: #ffffff; border-bottom: 1px solid var(--glass-border); transition: var(--transition-normal); }
.container { max-width: var(--container-max-width); margin: 0 auto; padding: 0 2rem; }
.header-content { display: flex; align-items: center; justify-content: flex-start; height: var(--header-height); }
.brand { display: flex; align-items: center; }
.logo-img { max-height: calc(var(--header-height) - 40px); height: auto; width: auto; max-width: 140px; object-fit: contain; display: block; }
.nav { flex: 1; display: flex; justify-content: center; }
.nav-list { display: flex; align-items: center; gap: 1.5rem; list-style: none; margin: 0; padding: 0; }
.nav-link { color: var(--gray-700); text-decoration: none; padding: 0.5rem 0.75rem; border-radius: var(--radius-md); transition: var(--transition-normal); }
.nav-link:hover { color: var(--primary-color); background: var(--primary-50); }
.header-contacts { margin-left: auto; display: flex; flex-direction: column; gap: 4px; align-items: center; }
.contact-link { color: var(--gray-800); text-decoration: none; font-weight: var(--font-weight-medium);}
.contact-link:hover { color: var(--primary-color); }

/* Бургер справа */
.burger { display: none; margin-left: 12px; width: 44px; height: 44px; border-radius: 8px; border: 1px solid var(--gray-200); background: var(--white); align-items: center; justify-content: center; color: var(--gray-700); }

/* Оверлей поверх страницы для клика вне */
.menu-overlay { position: fixed; inset: 0; background: transparent; z-index: 9; }

/* Мобильное меню под шапкой */
.mobile-menu { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border-bottom: 1px solid var(--gray-100); box-shadow: var(--shadow-lg); z-index: 10; }
.mobile-list { flex-direction: column; align-items: flex-start; gap: 0.5rem; padding: 1rem 0; }

@media (max-width: 1024px) {
  .container { padding: 0 1.5rem; }
  .nav-list { display: none; }
  .burger { display: inline-flex; margin-left: auto; }
  /* контакты остаются видимыми */
  .mobile-list { display: flex !important; }
    .header-contacts { margin-left: 0;       /* убираем автоматическое смещение вправо */
    margin-right: 0;
    justify-content: center;
    align-items: center;  /* оставляем вертикальное центрирование */
    text-align: center;
    width: 100%;}
}

@media (max-width: 768px) {
  :root { --header-height: 100px; }
  .container { padding: 0 1rem; }
}

/* Анимация выпадения */
.menu-fade-enter-from { opacity: 0; transform: translateY(-8px); }
.menu-fade-enter-active, .menu-fade-leave-active { transition: var(--transition-normal); }
.menu-fade-leave-to { opacity: 0; transform: translateY(-8px); }

@keyframes item-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes item-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-6px); } }
.menu-fade-enter-active .mobile-list .nav-item { opacity: 0; animation: item-in 260ms ease forwards; }
.menu-fade-leave-active .mobile-list .nav-item { animation: item-out 200ms ease forwards; }
.menu-fade-enter-active .mobile-list .nav-item:nth-child(1) { animation-delay: 40ms; }
.menu-fade-enter-active .mobile-list .nav-item:nth-child(2) { animation-delay: 80ms; }
.menu-fade-enter-active .mobile-list .nav-item:nth-child(3) { animation-delay: 120ms; }
.menu-fade-enter-active .mobile-list .nav-item:nth-child(4) { animation-delay: 160ms; }
.menu-fade-enter-active .mobile-list .nav-item:nth-child(5) { animation-delay: 200ms; }
.menu-fade-leave-active .mobile-list .nav-item:nth-child(1) { animation-delay: 120ms; }
.menu-fade-leave-active .mobile-list .nav-item:nth-child(2) { animation-delay: 90ms; }
.menu-fade-leave-active .mobile-list .nav-item:nth-child(3) { animation-delay: 60ms; }
.menu-fade-leave-active .mobile-list .nav-item:nth-child(4) { animation-delay: 30ms; }
.menu-fade-leave-active .mobile-list .nav-item:nth-child(5) { animation-delay: 0ms; }
</style>