import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { Application, ProductCategory } from '../applications/application.entity';
import { EmailValidationService } from './email-validation.service';
import { LoggerService } from '../utils/logger';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private emailValidationService: EmailValidationService,
    private logger: LoggerService,
  ) {
    const port = this.configService.get<number>('SMTP_PORT', 587);
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
      port,
      secure: port === 465,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  private getCategoryName(category: ProductCategory): string {
    const categoryNames = {
      [ProductCategory.BUILDING_FRAMES]: 'Каркасы зданий',
      [ProductCategory.COLUMNS_BEAMS]: 'Колонны и балки',
      [ProductCategory.PIPES]: 'Трубы',
      [ProductCategory.PILES]: 'Сваи',
      [ProductCategory.ELBOWS]: 'Отводы',
      [ProductCategory.OTHERS]: 'Прочее (прочая металлопродукция)',
    };
    return categoryNames[category] || 'Не указано';
  }

  async sendApplicationNotification(application: Application): Promise<void> {
    const categoryName = application.productCategory 
      ? this.getCategoryName(application.productCategory)
      : 'Не указано';

    const productInfo = application.productTitle 
      ? `<p><strong>Изделие:</strong> ${application.productTitle}</p>`
      : '';

    // Санитизация описания для снижения спам-триггеров
    const sanitizedDescription = application.description
      ? application.description
          .replace(/https?:\/\/\S+/gi, '[ссылка]')
          .replace(/[^\w\s.,:;!()\-а-яА-ЯёЁ]/g, '')
          .slice(0, 800)
      : '';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <img src="cid:brand-logo" alt="УралАнтикор" style="width: 100%; height: auto; object-fit: contain;" />
          <p style="color: #1f2869; margin: 10px 0 0 0; font-size: 16px;">Новая заявка с сайта</p>
        </div>
        
        <div style="padding: 30px; background: #ffffff;">
          <div style="background: #f7f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #748cab;">
            <h3 style="color: #2d3a4b; margin-top: 0; font-size: 18px;">Данные клиента</h3>
            <p style="margin: 8px 0; color: #2d3a4b;"><strong>Имя:</strong> ${application.name}</p>
            <p style="margin: 8px 0; color: #2d3a4b;"><strong>Email:</strong> ${application.email}</p>
            <p style="margin: 8px 0; color: #2d3a4b;"><strong>Телефон:</strong> ${application.phone}</p>
          </div>

          <div style="background: #f7f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2d3a4b;">
            <h3 style="color: #2d3a4b; margin-top: 0; font-size: 18px;">Детали заявки</h3>
            <p style="margin: 8px 0; color: #2d3a4b;"><strong>Категория изделия:</strong> ${categoryName}</p>
            ${productInfo}
            ${sanitizedDescription ? `<p style="margin: 8px 0; color: #2d3a4b; white-space: pre-line;"><strong>Описание:</strong> ${sanitizedDescription}</p>` : ''}
          </div>

          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #b8d4f0;">
            <h4 style="color: #2d3a4b; margin-top: 0;">Информация о заявке</h4>
            <p style="margin: 5px 0; color: #2d3a4b;">
              <strong>ID заявки:</strong> ${application.id}<br>
              <strong>Дата создания:</strong> ${application.createdAt.toLocaleString('ru-RU')}
            </p>
          </div>
        </div>

        <div style="background: #f7f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
          <p style="color: #748cab; font-size: 14px; margin: 0;">
            Это автоматическое уведомление с сайта УралАнтикор
          </p>
        </div>
      </div>
    `;

    const plainText = [
      'Новая заявка с сайта УралАнтикор',
      '',
      `Имя: ${application.name}`,
      `Email: ${application.email}`,
      `Телефон: ${application.phone}`,
      `Категория: ${categoryName}`,
      application.productTitle ? `Изделие: ${application.productTitle}` : undefined,
      application.description ? `Описание: ${application.description}` : undefined,
      '',
      `ID заявки: ${application.id}`,
      `Дата: ${application.createdAt.toLocaleString('ru-RU')}`,
    ].filter(Boolean).join('\n');

    const logoPath = this.configService.get('LOGO_PATH') || path.resolve(process.cwd(), '../frontend/public/img/header/Company_logo.png');
    const mailOptions = {
      from: `УралАнтикор <${this.configService.get('SMTP_USER')}>`,
      to: this.configService.get('ADMIN_EMAIL', 'admin@uralconstruct.ru'),
      replyTo: application.email,
      subject: `Новая заявка: ${application.name} — ${categoryName}`,
      text: plainText,
      html: htmlContent,
      attachments: [
        {
          filename: 'Company_logo.png',
          path: logoPath,
          cid: 'brand-logo',
        },
      ],
      headers: {
        'X-Priority': '3 (Normal)',
      },
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.logEmail(mailOptions.to, mailOptions.subject, true);
      console.log(`✅ Email уведомление отправлено для заявки ${application.id} на ${mailOptions.to}`);
      console.log(`📧 Тема письма: ${mailOptions.subject}`);
    } catch (error) {
      this.logger.logEmail(mailOptions.to, mailOptions.subject, false, error.message);
      console.error('❌ Ошибка отправки email:', error);
      console.error('📧 Детали ошибки:', {
        to: mailOptions.to,
        subject: mailOptions.subject,
        error: error.message
      });
      // Не прерываем выполнение, если email не отправился
    }
  }

  async sendClientConfirmation(application: Application): Promise<void> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align:center; margin-bottom: 10px;">
          <img src="cid:brand-logo" alt="УралАнтикор" style="width: 100%; height: auto; object-fit: contain;" />
        </div>
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

        <p>С уважением,<br>Команда УралАнтикор</p>
      </div>
    `;

    const confirmationText = [
      'Спасибо за вашу заявку!',
      '',
      `Номер заявки: ${application.id}`,
      `Дата подачи: ${application.createdAt.toLocaleString('ru-RU')}`,
      '',
      'С уважением, команда УралАнтикор'
    ].join('\n');

    const logoPath2 = this.configService.get('LOGO_PATH') || path.resolve(process.cwd(), '../frontend/public/img/header/Company_logo.png');
    const mailOptions = {
      from: `УралАнтикор <${this.configService.get('SMTP_USER')}>`,
      to: application.email,
      subject: 'УралАнтикор — заявка принята',
      text: confirmationText,
      html: htmlContent,
      attachments: [
        {
          filename: 'Company_logo.png',
          path: logoPath2,
          cid: 'brand-logo',
        },
      ],
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.logEmail(application.email, 'УралАнтикор — заявка принята', true);
      console.log(`✅ Подтверждение отправлено клиенту ${application.email}`);
    } catch (error) {
      this.logger.logEmail(application.email, 'УралАнтикор — заявка принята', false, error.message);
      console.error('❌ Ошибка отправки подтверждения клиенту:', error);
    }
  }
} 