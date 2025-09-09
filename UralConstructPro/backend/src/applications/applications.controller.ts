import { Controller, Get, Post, Body, Param, Put, HttpCode, HttpStatus, Headers, Req, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application, ApplicationStatus } from './application.entity';
import { EmailValidationService } from '../mail/email-validation.service';
import { Request } from 'express';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly emailValidationService: EmailValidationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую заявку' })
  @ApiHeader({ 
    name: 'X-Recipient-Email', 
    description: 'Email для отправки заявки (опционально)', 
    required: false 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Заявка успешно создана',
    type: Application 
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 429, description: 'Слишком много заявок' })
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
    @Headers('x-recipient-email') recipientEmail: string,
    @Req() request: Request,
  ): Promise<Application> {
    // Валидация email домена
    const isEmailValid = await this.emailValidationService.validateEmailDomain(createApplicationDto.email);
    if (!isEmailValid) {
      throw new BadRequestException('Некорректный email адрес');
    }

    // Проверка rate limit
    const clientIp = request.ip || request.connection.remoteAddress || 'unknown';
    const rateLimitId = this.emailValidationService.getRateLimitIdentifier(createApplicationDto.email, clientIp);
    this.emailValidationService.checkRateLimit(rateLimitId);

    return this.applicationsService.create(createApplicationDto, recipientEmail);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все заявки' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список заявок',
    type: [Application] 
  })
  async findAll(): Promise<Application[]> {
    return this.applicationsService.findAll();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Получить статистику заявок' })
  @ApiResponse({ 
    status: 200, 
    description: 'Статистика заявок' 
  })
  async getStatistics() {
    return this.applicationsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заявку по ID' })
  @ApiParam({ name: 'id', description: 'ID заявки' })
  @ApiResponse({ 
    status: 200, 
    description: 'Заявка найдена',
    type: Application 
  })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  async findOne(@Param('id') id: string): Promise<Application> {
    return this.applicationsService.findOne(id);
  }

  @Put(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновить статус заявки' })
  @ApiParam({ name: 'id', description: 'ID заявки' })
  @ApiResponse({ 
    status: 200, 
    description: 'Статус обновлен',
    type: Application 
  })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: ApplicationStatus; comment?: string }
  ): Promise<Application> {
    return this.applicationsService.updateStatus(id, body.status, body.comment);
  }
} 