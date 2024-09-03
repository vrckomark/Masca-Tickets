import { DataSource } from 'typeorm';
import { Vendor, Event, Ticket } from './types';
import { Entities, migrations } from '@veramo/data-store';
import dotenv from 'dotenv';

dotenv.config();

export const dbConnection = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRESSQL_URL,
  synchronize: true,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: [...Entities, Vendor, Event, Ticket],
}).initialize();