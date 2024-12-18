import { DataSource } from 'typeorm';
import { Contact } from '../src/entities/contact.entity';

export const PgDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'boilerplate',
  entities: [Contact],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
});
