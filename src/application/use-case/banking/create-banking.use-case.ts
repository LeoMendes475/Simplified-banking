import { BankingEntity } from '../../../domain/entities/banking.entity';
import { IBankingRepository } from '../../../domain/repositories/i-banking.repository';

export class CreateBankingUseCase {
  constructor(private bankingRepository: IBankingRepository) {}

  async execute(payerId: string): Promise<BankingEntity> {
    return await this.bankingRepository.create(payerId);
  }
}
