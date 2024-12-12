import { DataSource } from 'typeorm';
import { Task } from '../src/entities/task.entity';
export const PgDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'boilerplate',
  entities: [Task],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
});
