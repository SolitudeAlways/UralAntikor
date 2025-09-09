import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum, MinLength, MaxLength } from 'class-validator';
import { ProductCategory } from '../application.entity';

export class CreateApplicationDto {
  @ApiProperty({ 
    description: 'Имя клиента',
    example: 'Иван Иванов',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ 
    description: 'Email клиента',
    example: 'ivan@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'Телефон клиента',
    example: '+7 (900) 123-45-67'
  })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  phone: string;

  @ApiProperty({ 
    description: 'Категория изделия',
    enum: ProductCategory,
    example: ProductCategory.BUILDING_FRAMES
  })
  @IsEnum(ProductCategory)
  productCategory: ProductCategory;

  @ApiProperty({ 
    description: 'Название изделия',
    required: false,
    example: 'Металлические фермы'
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  productTitle?: string;

  @ApiProperty({ 
    description: 'Описание задачи',
    example: 'Нужен каркас здания размером 20x30 метров'
  })
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description: string;
} 