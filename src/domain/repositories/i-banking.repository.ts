import { createBankingDTO } from '../../application/dto/banking.dto';
import { BankingEntity } from '../entities/banking.entity';

export interface IBankingRepository {
  create(data: createBankingDTO): Promise<BankingEntity>;
  findOneByPayerId(payerId: string): Promise<BankingEntity | null>;
}
