import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { PayerEntity } from '../../domain/entities/payer.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { BankingEntity } from '../../domain/entities/banking.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { RoleEntity } from '../../domain/entities/role.entity';
import { TransactionEntity } from '../../domain/entities/transaction.entity';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'micro_banking',
  entities: [PayerEntity, UserEntity, BankingEntity, CategoryEntity, RoleEntity, TransactionEntity],
  migrations: [resolve(__dirname, './migrations/*.ts')],
});
