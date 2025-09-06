import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Application } from '../applications/application.entity';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'password'),
  database: configService.get('DB_NAME', 'ural_construct'),
  entities: [Application],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
}); 