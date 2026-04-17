import { BankingEntity } from '../entities/banking.entity';

export interface IBankingRepository {
  create(payerId: string): Promise<BankingEntity>;
  findOneByPayerId(payerId: string): Promise<BankingEntity | null>;
}
