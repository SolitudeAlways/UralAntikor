<template>
  <footer class="footer">
    <div class="container">
      <!-- Слоган по центру -->
      <div class="footer-slogan">
        <h2 class="slogan-title">УралХардСтил</h2>
        <p class="slogan-text">
          Надежные металлоконструкции для вашего успеха
        </p>
      </div>
      
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">О компании</h3>
          <p class="footer-description">
            УралХардСтил - ведущее предприятие по производству металлоконструкций на Урале. 
            Мы создаем качественные решения для промышленности и строительства.
          </p>
          <div class="social-links">
            <a href="#" class="social-link">📧 Email</a>
            <a href="#" class="social-link">📱 WhatsApp</a>
            <a href="#" class="social-link">💬 Telegram</a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Контакты</h3>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <div class="contact-details">
                <span class="contact-label">Телефон</span>
                <span class="contact-value">+7 (343) 123-45-67</span>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <div class="contact-details">
                <span class="contact-label">Email</span>
                <span class="contact-value">info@uralhardsteel.ru</span>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div class="contact-details">
                <span class="contact-label">Адрес</span>
                <span class="contact-value">г. Екатеринбург, ул. Промышленная, 15</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Услуги</h3>
          <ul class="services-list">
            <li>Каркасы зданий</li>
            <li>Фасадные системы</li>
            <li>Промышленные конструкции</li>
            <li>Металлоконструкции</li>
            <li>Проектирование</li>
            <li>Монтаж и установка</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Режим работы</h3>
          <div class="working-hours">
            <div class="hours-item">
              <span>Пн-Пт:</span>
              <span>8:00 - 18:00</span>
            </div>
            <div class="hours-item">
              <span>Сб:</span>
              <span>9:00 - 15:00</span>
            </div>
            <div class="hours-item">
              <span>Вс:</span>
              <span>Выходной</span>
            </div>
          </div>
          
          <div class="emergency-contact">
            <h4>Экстренная связь</h4>
            <p>+7 (343) 123-45-68</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-links">
          <a href="#" class="footer-link">Политика конфиденциальности</a>
          <a href="#" class="footer-link">Условия использования</a>
          <a href="#" class="footer-link">Карта сайта</a>
        </div>
        <div class="copyright">
          © 2024 УралХардСтил. Все права защищены.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Компонент не требует дополнительной логики
</script>

<style scoped>
.footer {
  background: var(--gradient-dark);
  color: var(--white);
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  opacity: 0.3;
}

.footer::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: var(--primary-100);
  border-radius: 50%;
  opacity: 0.1;
  transform: translate(50%, -50%);
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.footer-slogan {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.slogan-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.slogan-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
}

.slogan-text {
  font-size: var(--font-size-xl);
  color: rgba(255, 255, 255, 0.9);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-relaxed);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 1.5rem;
  color: var(--white);
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: var(--transition-normal);
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: var(--backdrop-blur);
}

.social-link:hover {
  color: var(--white);
  border-color: var(--primary-color);
  background: rgba(37, 99, 235, 0.2);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition-normal);
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
  transform: translateX(4px);
}

.contact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.7);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.95);
  font-weight: var(--font-weight-semibold);
}

.services-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.services-list li {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-sm);
  transition: var(--transition-normal);
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  position: relative;
}

.services-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  opacity: 0;
  transition: var(--transition-normal);
}

.services-list li:hover {
  color: var(--white);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
  transform: translateX(8px);
}

.services-list li:hover::before {
  opacity: 1;
}

.working-hours {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-sm);
}

.emergency-contact {
  padding: 1.5rem;
  background: rgba(239, 68, 68, 0.15);
  border-radius: var(--radius-xl);
  border: 2px solid rgba(239, 68, 68, 0.3);
  position: relative;
  overflow: hidden;
}

.emergency-contact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--error-color);
}

.emergency-contact h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #ef4444;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.emergency-contact p {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.95);
  font-weight: var(--font-weight-bold);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: var(--transition-normal);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
}

.footer-link:hover {
  color: var(--white);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
}

.copyright {
  color: rgba(255, 255, 255, 0.6);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .footer {
    padding: 3rem 0 1.5rem;
  }
  
  .slogan-title {
    font-size: var(--font-size-3xl);
  }
  
  .slogan-text {
    font-size: var(--font-size-lg);
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>
