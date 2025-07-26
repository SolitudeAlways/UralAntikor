<template>
  <header class="header" @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="header-bg" :class="{ active: hover }"></div>
    <div class="header-overlay">
      <div class="logo-block">
        <img class="logo-img" src="../img/logo.png" alt="Логотип" />
      </div>
      <div class="nav-wrapper">
        <nav class="nav">
          <el-button type="text" @click="scrollToSection('catalog', $event)">Каталог</el-button>
          <el-button type="text" @click="scrollToSection('about', $event)">О нас</el-button>
          <el-button type="text" @click="scrollToSection('contacts', $event)">Контакты</el-button>
        </nav>
      </div>
      <div class="slogan">
        <span>Надёжные металлоконструкции для вашего бизнеса</span>
      </div>
      <div class="contacts">
        <div class="phone">+7 (900) 123-45-67</div>
        <div class="phone">+7 (900) 765-43-21</div>
        <div class="email">info@metallsite.ru</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hover = ref(false)

const scrollToSection = (sectionId: string, event: Event) => {
  // Анимация кнопки при клике
  const button = event.currentTarget as HTMLElement
  if (button) {
    button.style.transform = 'scale(0.95)'
    button.style.transition = 'transform 0.1s ease'
    
    setTimeout(() => {
      button.style.transform = 'scale(1)'
    }, 100)
  }
  
  // Плавная прокрутка к секции
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
.header {
  width: 100vw;
  min-height: 180px;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow: hidden;
}
.header-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  background: url('../img/header.jpg') center center/cover no-repeat;
  transition: filter 0.4s, transform 0.4s;
  filter: brightness(0.7);
  transform: scale(1);
}
.header-bg.active {
  filter: brightness(0.5) blur(1px);
  transform: scale(1.05);
}
.header-overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  min-height: 180px;
}
.logo-block {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 90px;
}
.logo-img {
  width: 128px;
  height: 128px;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.logo-img:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
.nav-wrapper {
  position: absolute;
  top: 24px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}
.nav {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  background: rgba(0,0,0,0.12);
  border-radius: 12px;
  padding: 8px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  pointer-events: auto;
}
.nav .el-button,
.nav .el-button span,
.nav .el-button__text {
  color: #fff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.18);
}
.nav .el-button:hover,
.nav .el-button:focus,
.nav .el-button:active,
.nav .el-button:hover span,
.nav .el-button:focus span,
.nav .el-button:active span {
  color: #fff !important;
}

.nav .el-button {
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  background: rgba(0,0,0,0.18);
  border-radius: 8px;
  padding: 8px 16px;
}

.nav .el-button:hover {
  background: rgba(0,0,0,0.35);
  transform: translateY(-1px);
}

.nav .el-button:active {
  transform: scale(0.95) translateY(0);
  background: rgba(0,0,0,0.45);
  transition: transform 0.1s ease, background 0.1s ease;
}
.slogan {
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 2px 8px rgba(0,0,0,0.25);
  letter-spacing: -0.02em;
  line-height: 1.3;
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #fff;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  gap: 4px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
.phone {
  font-weight: 600;
  letter-spacing: 0.01em;
}
.email {
  font-size: 0.98rem;
  font-weight: 400;
  opacity: 0.9;
  letter-spacing: 0.02em;
}
@media (max-width: 900px) {
  .header-overlay {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
    min-height: 200px;
  }
  .logo-block {
    justify-content: center;
    margin-bottom: 10px;
  }
  .logo-img {
    width: 48px;
    height: 48px;
    margin-top: 10px;
  }
  .nav-wrapper {
    position: static;
    width: 100%;
    margin-bottom: 12px;
    justify-content: center;
    pointer-events: auto;
  }
  .nav {
    flex-direction: column;
    gap: 12px;
    padding: 8px 0;
    margin-bottom: 0;
  }
  
  .nav .el-button {
    background: rgba(0,0,0,0.15);
    border-radius: 6px;
    padding: 10px 20px;
  }
  
  .nav .el-button:hover {
    background: rgba(0,0,0,0.3);
    transform: translateY(-1px);
  }
  .contacts {
    align-items: center;
    margin-top: 10px;
  }
  .slogan {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 10px 0;
    letter-spacing: -0.01em;
  }
}
</style>