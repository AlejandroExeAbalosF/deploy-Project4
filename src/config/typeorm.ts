import { config as dotenvConfig } from 'dotenv';
import { Category } from 'src/entities/category.entity';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.development.env' });

const config = {
  type: 'postgres',
  host: 'postgresdb',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/entities/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  // dropSchema: true,
};

export default registerAs('typeorm', () => config);
export const dataSource = new DataSource(config as DataSourceOptions);
