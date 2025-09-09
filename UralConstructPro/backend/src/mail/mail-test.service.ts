import { Injectable } from '@nestjs/common';
import { Application } from '../applications/application.entity';

@Injectable()
export class MailTestService {
  async sendApplicationNotification(application: Application): Promise<void> {
    const email = 'admin@uralconstruct.ru';
    
    console.log('\n📧 ===== EMAIL УВЕДОМЛЕНИЕ =====');
    console.log(`📬 Получатель: ${email}`);
    console.log(`👤 От: ${application.name} (${application.email})`);
    console.log(`↪️ Reply-To будет: ${application.email}`);
    console.log(`📱 Телефон: ${application.phone}`);
    console.log(`🏗️ Категория: ${application.productCategory || 'Не указано'}`);
    console.log(`🔧 Изделие: ${application.productTitle || 'Не указано'}`);
    console.log(`📝 Описание: ${application.description || 'Не указано'}`);
    console.log(`🆔 ID заявки: ${application.id}`);
    console.log(`📅 Дата: ${application.createdAt.toLocaleString('ru-RU')}`);
    console.log('📧 ================================\n');
  }

  async sendClientConfirmation(application: Application): Promise<void> {
    console.log('\n📧 ===== ПОДТВЕРЖДЕНИЕ КЛИЕНТУ =====');
    console.log(`📬 Получатель: ${application.email}`);
    console.log(`👤 Клиент: ${application.name}`);
    console.log(`🆔 ID заявки: ${application.id}`);
    console.log(`📅 Дата: ${application.createdAt.toLocaleString('ru-RU')}`);
    console.log('📧 ====================================\n');
  }
}
