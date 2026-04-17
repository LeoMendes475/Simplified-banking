import { Repository } from 'typeorm';
import { BankingEntity } from '../../../domain/entities/banking.entity';
import { IBankingRepository } from '../../../domain/repositories/i-banking.repository';

export class BankingRepository implements IBankingRepository {
  private repository: Repository<BankingEntity>;

  async create(payerId: string): Promise<BankingEntity> {
    const newAccount = new BankingEntity({ payerId });
    return this.repository.save(newAccount);
  }

  async findOneByPayerId(payerId: string): Promise<BankingEntity | null> {
    return this.repository.findOneBy({
      payer: { id: payerId },
    });
  }
}
