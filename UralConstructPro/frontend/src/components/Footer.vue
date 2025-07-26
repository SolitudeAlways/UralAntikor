<template>
  <footer id="contacts" class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <img class="footer-logo" src="../img/logo.png" alt="Логотип" />
        <div class="footer-company">ООО "УралХардСтил"<br />Изготовление металлоконструкций</div>
      </div>
      <div class="footer-center">
        <div class="footer-contacts">
          <div class="footer-phone">+7 (900) 123-45-67</div>
          <div class="footer-phone">+7 (900) 765-43-21</div>
          <div class="footer-email">info@metallsite.ru</div>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-socials">
          <a href="#" target="_blank" class="footer-social vk" title="ВКонтакте"></a>
          <a href="#" target="_blank" class="footer-social tg" title="Telegram"></a>
          <a href="#" target="_blank" class="footer-social wa" title="WhatsApp"></a>
        </div>
        <div class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} УралХардСтил. Все права защищены.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Можно добавить динамику, если потребуется
</script>

<style scoped>
.footer {
  background: #2d3a4b;
  color: #fff;
  padding: 36px 0 18px 0;
  box-shadow: 0 -2px 16px 0 rgba(44, 62, 80, 0.08);
}
.footer-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  padding: 0 24px;
  flex-wrap: wrap;
}
.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.footer-logo {
  width: 54px;
  height: 54px;
  object-fit: contain;
}
.footer-company {
  font-size: 1.08rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  opacity: 0.92;
  line-height: 1.5;
}
.footer-center {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
}
.footer-contacts {
  font-size: 1.08rem;
  font-family: 'Inter', sans-serif;
  opacity: 0.95;
  text-align: center;
}
.footer-phone {
  font-weight: 600;
  letter-spacing: 0.01em;
}
.footer-email {
  font-size: 0.98rem;
  font-weight: 400;
  opacity: 0.85;
  letter-spacing: 0.02em;
}
.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 160px;
}
.footer-socials {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}
.footer-social {
  width: 32px;
  height: 32px;
  display: inline-block;
  background-size: 70% 70%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.13);
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.10);
}
.footer-social.vk { background-image: url('/img/vk.svg'); }
.footer-social.tg { background-image: url('/img/tg.svg'); }
.footer-social.wa { background-image: url('/img/wa.svg'); }
.footer-social:hover {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(44,62,80,0.13);
  transform: scale(1.1);
}

.footer-social:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}
.footer-social.vk:hover { background-image: url('/img/vk-blue.svg'); }
.footer-social.tg:hover { background-image: url('/img/tg-blue.svg'); }
.footer-social.wa:hover { background-image: url('/img/wa-green.svg'); }
.footer-copyright {
  font-size: 0.98rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  opacity: 0.7;
  text-align: right;
  letter-spacing: 0.01em;
}
@media (max-width: 900px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 0 8px;
  }
  .footer-left, .footer-center, .footer-right {
    align-items: center;
    text-align: center;
  }
  .footer-right {
    min-width: 0;
  }
}
</style>
