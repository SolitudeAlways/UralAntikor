<template>
  <div class="dashboard">
    <Header @scrollToSection="scrollToSection" />
    
    <main class="main-content">
      <!-- О компании -->
      <AboutSection />
      
      <!-- Каталог -->
      <CatalogSection />
      
      <!-- Лицензии и сертификаты -->
      <LicensesSection />
      
      <!-- Фотографии производства -->
      <ProductionSection />
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import AboutSection from '@/components/AboutSection.vue'
import CatalogSection from '@/components/CatalogSection.vue'
import LicensesSection from '@/components/LicensesSection.vue'
import ProductionSection from '@/components/ProductionSection.vue'
import Footer from '@/components/Footer.vue'

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
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: var(--gradient-subtle);
}
</style>