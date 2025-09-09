import { Controller, Get, Post, Body, Param, Put, HttpCode, HttpStatus, Req, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
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
  @Throttle({ default: { limit: 1, ttl: 60000 } }) // 1 заявка в минуту
  @ApiOperation({ summary: 'Создать новую заявку' })
  @ApiResponse({ 
    status: 201, 
    description: 'Заявка успешно создана',
    type: Application 
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 429, description: 'Слишком много заявок' })
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
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

    return this.applicationsService.create(createApplicationDto);
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