import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Application, ProductCategory } from '../applications/application.entity';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  private getCategoryName(category: ProductCategory): string {
    const categoryNames = {
      [ProductCategory.BUILDING_FRAMES]: 'Каркасы зданий и сооружений',
      [ProductCategory.COLUMNS_BEAMS]: 'Колонны, балки, фермы, ригели',
      [ProductCategory.CANOPIES_COVERS]: 'Металлические навесы, козырьки, перекрытия',
      [ProductCategory.STAIRS_RAILINGS]: 'Лестничные марши и ограждения',
      [ProductCategory.MACHINE_FRAMES]: 'Станочные рамы, каркасы станков',
      [ProductCategory.LIFTING_DEVICES]: 'Подъемные устройства',
      [ProductCategory.PLATFORMS]: 'Механизированные платформы',
      [ProductCategory.PROTECTIVE_COVERS]: 'Защитные кожухи, корпуса',
      [ProductCategory.FACADE_STRUCTURES]: 'Фасадные конструкции',
      [ProductCategory.DOMES_ARCHES]: 'Металлические купола, арки',
      [ProductCategory.PANORAMIC_GLAZING]: 'Панорамные остекления с металлическим каркасом',
      [ProductCategory.URBAN_ELEMENTS]: 'Элементы благоустройства',
    };
    return categoryNames[category] || 'Не указано';
  }

  async sendApplicationNotification(application: Application): Promise<void> {
    const categoryName = application.productCategory 
      ? this.getCategoryName(application.productCategory)
      : 'Не указано';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d3a4b;">Новая заявка с сайта</h2>
        
        <div style="background: #f7f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #748cab; margin-top: 0;">Данные клиента:</h3>
          <p><strong>Имя:</strong> ${application.name}</p>
          <p><strong>Email:</strong> ${application.email}</p>
          <p><strong>Телефон:</strong> ${application.phone}</p>
        </div>

        <div style="background: #f7f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #748cab; margin-top: 0;">Детали заявки:</h3>
          <p><strong>Категория изделия:</strong> ${categoryName}</p>
          ${application.description ? `<p><strong>Описание:</strong> ${application.description}</p>` : ''}
        </div>

        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #2d3a4b;">
            <strong>ID заявки:</strong> ${application.id}<br>
            <strong>Дата создания:</strong> ${application.createdAt.toLocaleString('ru-RU')}
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #748cab; font-size: 14px;">
            Это автоматическое уведомление с сайта Ural Construct Pro
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: this.configService.get('SMTP_USER'),
      to: this.configService.get('ADMIN_EMAIL', 'admin@uralconstruct.ru'),
      subject: `Новая заявка от ${application.name}`,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email уведомление отправлено для заявки ${application.id}`);
    } catch (error) {
      console.error('❌ Ошибка отправки email:', error);
      // Не прерываем выполнение, если email не отправился
    }
  }

  async sendClientConfirmation(application: Application): Promise<void> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d3a4b;">Спасибо за вашу заявку!</h2>
        
        <p>Уважаемый ${application.name},</p>
        
        <p>Мы получили вашу заявку и свяжемся с вами в ближайшее время для уточнения деталей.</p>
        
        <div style="background: #f7f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #748cab; margin-top: 0;">Данные вашей заявки:</h3>
          <p><strong>Номер заявки:</strong> ${application.id}</p>
          <p><strong>Дата подачи:</strong> ${application.createdAt.toLocaleString('ru-RU')}</p>
        </div>

        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #2d3a4b;">
            <strong>Наши контакты:</strong><br>
            Телефон: +7 (900) 123-45-67<br>
            Email: info@uralconstruct.ru
          </p>
        </div>

        <p>С уважением,<br>Команда Ural Construct Pro</p>
      </div>
    `;

    const mailOptions = {
      from: this.configService.get('SMTP_USER'),
      to: application.email,
      subject: 'Ваша заявка принята',
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Подтверждение отправлено клиенту ${application.email}`);
    } catch (error) {
      console.error('❌ Ошибка отправки подтверждения клиенту:', error);
    }
  }
} 