import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private mailService: MailService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const application = this.applicationsRepository.create(createApplicationDto);
    const savedApplication = await this.applicationsRepository.save(application);

    // Отправляем email уведомления
    await Promise.all([
      this.mailService.sendApplicationNotification(savedApplication),
      this.mailService.sendClientConfirmation(savedApplication),
    ]);

    return savedApplication;
  }

  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    }

    return application;
  }

  async updateStatus(id: string, status: ApplicationStatus, comment?: string): Promise<Application> {
    const application = await this.findOne(id);
    
    application.status = status;
    if (comment) {
      application.managerComment = comment;
    }

    return this.applicationsRepository.save(application);
  }

  async getStatistics() {
    const [total, newCount, processingCount, completedCount] = await Promise.all([
      this.applicationsRepository.count(),
      this.applicationsRepository.count({ where: { status: ApplicationStatus.NEW } }),
      this.applicationsRepository.count({ where: { status: ApplicationStatus.PROCESSING } }),
      this.applicationsRepository.count({ where: { status: ApplicationStatus.COMPLETED } }),
    ]);

    return {
      total,
      new: newCount,
      processing: processingCount,
      completed: completedCount,
    };
  }
} 