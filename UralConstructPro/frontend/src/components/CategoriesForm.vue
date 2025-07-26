<template>
  <section id="catalog" class="categories-section">
    <h2 class="categories-title">Категории изделий</h2>
    <div class="categories-grid">
      <div
        v-for="(category, idx) in categories"
        :key="category.name"
        class="category-card"
        :style="{ backgroundImage: `url(${category.image})` }"
        @click="handleCategoryClick"
      >
        <div class="category-overlay">
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  {
    name: 'Каркасы зданий и сооружений',
    image: '/img/categories/frame.webp',
  },
  {
    name: 'Колонны, балки, фермы, ригели',
    image: '/img/categories/columns.jpg',
  },
  {
    name: 'Металлические навесы, козырьки, перекрытия',
    image: '/img/categories/canopy.webp',
  },
  {
    name: 'Лестничные марши и ограждения',
    image: '/img/categories/stairs.jpg',
  },
  {
    name: 'Станочные рамы, каркасы станков',
    image: '/img/categories/machine-frame.jpg',
  },
  {
    name: 'Подъемные устройства',
    image: '/img/categories/lift.jpg',
  },
  {
    name: 'Механизированные платформы',
    image: '/img/categories/platform.jpg',
  },
  {
    name: 'Защитные кожухи, корпуса',
    image: '/img/categories/case.webp',
  },
  {
    name: 'Фасадные конструкции',
    image: '/img/categories/facade.webp',
  },
  {
    name: 'Металлические купола, арки',
    image: '/img/categories/dome.jpg',
  },
  {
    name: 'Панорамные остекления с металлическим каркасом',
    image: '/img/categories/panorama.webp',
  },
  {
    name: 'Элементы благоустройства',
    image: '/img/categories/urban.jpg',
  },
]

const handleCategoryClick = (event: Event) => {
  const card = event.currentTarget as HTMLElement
  if (card) {
    // Анимация при клике
    card.style.transform = 'scale(0.98) translateY(-4px)'
    card.style.transition = 'transform 0.15s ease'
    
    setTimeout(() => {
      card.style.transform = 'translateY(-8px) scale(1.03)'
    }, 150)
    
    setTimeout(() => {
      card.style.transform = ''
      card.style.transition = ''
    }, 300)
  }
}
</script>

<style scoped>
.categories-section {
  padding: 48px 0 32px 0;
  background: #f7f9fa;
}
.categories-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  margin-bottom: 32px;
  color: #2d3a4b;
  letter-spacing: -0.03em;
  line-height: 1.2;
}
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 16px;
}
.category-card {
  position: relative;
  height: 220px;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 6px 32px 0 rgba(44, 62, 80, 0.13), 0 1.5px 6px 0 rgba(44, 62, 80, 0.10);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  align-items: flex-end;
}
.category-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 40px 0 rgba(44, 62, 80, 0.18), 0 2px 8px 0 rgba(44, 62, 80, 0.13);
}

.category-card:active {
  transform: scale(0.98) translateY(-4px);
  transition: transform 0.15s ease;
}
.category-overlay {
  width: 100%;
  background: linear-gradient(0deg, rgba(44,62,80,0.82) 60%, rgba(44,62,80,0.18) 100%);
  padding: 28px 18px 18px 18px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}
.category-name {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
  letter-spacing: -0.01em;
  line-height: 1.4;
}
@media (max-width: 700px) {
  .categories-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 18px;
    letter-spacing: -0.02em;
  }
  .categories-section {
    padding: 24px 0 16px 0;
  }
  .category-card {
    height: 140px;
  }
  .categories-grid {
    gap: 14px;
  }
  .category-overlay {
    padding: 14px 8px 8px 8px;
  }
  .category-name {
    font-size: 0.98rem;
    font-weight: 600;
    letter-spacing: -0.005em;
  }
}
</style>
