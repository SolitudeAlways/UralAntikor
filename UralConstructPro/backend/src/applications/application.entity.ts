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
  CANOPIES_COVERS = 'canopies_covers',
  STAIRS_RAILINGS = 'stairs_railings',
  MACHINE_FRAMES = 'machine_frames',
  LIFTING_DEVICES = 'lifting_devices',
  PLATFORMS = 'platforms',
  PROTECTIVE_COVERS = 'protective_covers',
  FACADE_STRUCTURES = 'facade_structures',
  DOMES_ARCHES = 'domes_arches',
  PANORAMIC_GLAZING = 'panoramic_glazing',
  URBAN_ELEMENTS = 'urban_elements',
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