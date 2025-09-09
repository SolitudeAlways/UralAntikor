import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ApplicationStatus {
  NEW = 'new',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export enum ProductCategory {
  BUILDING_FRAMES = 'building_frames',
  COLUMNS_BEAMS = 'columns_beams',
  PIPES = 'pipes',
  PILES = 'piles',
  ELBOWS = 'elbows',
  OTHERS = 'others',
}

@Entity('applications')
export class Application {
  @ApiProperty({ description: 'Уникальный идентификатор заявки' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Имя клиента' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: 'Email клиента' })
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @ApiProperty({ description: 'Телефон клиента' })
  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @ApiProperty({ description: 'Категория изделия' })
  @Column({ 
    type: 'varchar', 
    nullable: true 
  })
  productCategory: ProductCategory;

  @ApiProperty({ description: 'Название изделия' })
  @Column({ 
    type: 'varchar', 
    length: 200,
    nullable: true 
  })
  productTitle: string;

  @ApiProperty({ description: 'Описание задачи' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Статус заявки' })
  @Column({ 
    type: 'varchar', 
    default: ApplicationStatus.NEW 
  })
  status: ApplicationStatus;

  @ApiProperty({ description: 'Комментарий менеджера' })
  @Column({ type: 'text', nullable: true })
  managerComment: string;

  @ApiProperty({ description: 'Дата создания заявки' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления заявки' })
  @UpdateDateColumn()
  updatedAt: Date;
} 