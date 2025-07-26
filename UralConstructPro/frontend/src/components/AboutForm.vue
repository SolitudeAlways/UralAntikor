<template>
  <section id="about" class="about-section">
    <div class="about-container">
      <div class="about-image-block">
        <img class="about-image" src="/img/about.jpg" alt="О компании" />
      </div>
      <div class="about-content">
        <h2 class="about-title">О компании</h2>
        <p class="about-text">
          Наша компания специализируется на проектировании, производстве и монтаже металлоконструкций любой сложности. Мы работаем на рынке более 10 лет и реализовали сотни успешных проектов для промышленных, коммерческих и частных заказчиков.
        </p>
        <ul class="about-list">
          <li>Собственное производство и современное оборудование</li>
          <li>Опытная команда инженеров и монтажников</li>
          <li>Индивидуальный подход к каждому проекту</li>
          <li>Гарантия качества и соблюдение сроков</li>
        </ul>
        <p class="about-text">
          Мы готовы реализовать для вас любые задачи — от небольших конструкций до масштабных объектов. Обращайтесь, и мы поможем воплотить ваши идеи в металле!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Можно добавить props или логику, если потребуется
</script>

<style scoped>
.about-section {
  background: #748cab;
  padding: 56px 0 48px 0;
  box-shadow: 0 2px 16px 0 rgba(44, 62, 80, 0.06);
}
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 0 24px;
}
.about-image-block {
  flex: 0 0 340px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-image {
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 4px 32px 0 rgba(44, 62, 80, 0.13);
  background: #f7f9fa;
}
.about-content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.about-title {
  font-size: 2.2rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -0.03em;
  line-height: 1.2;
}
.about-text {
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.7;
  margin-bottom: 0;
  letter-spacing: 0.01em;
}
.about-list {
  margin: 0 0 0 18px;
  padding: 0;
  color: #ffffff;
  font-size: 1.08rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.7;
  list-style: disc;
  letter-spacing: 0.01em;
}
@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    gap: 24px;
    padding: 0 8px;
  }
  .about-image-block {
    flex: none;
  }
  .about-image {
    width: 220px;
    height: 220px;
  }
  .about-title {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
}
</style>
