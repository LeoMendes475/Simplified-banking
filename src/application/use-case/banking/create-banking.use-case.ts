import { BankingEntity } from '../../../domain/entities/banking.entity';
import { IBankingRepository } from '../../../domain/repositories/i-banking.repository';
import { createBankingDTO } from '../../dto/banking.dto';

export class CreateBankingUseCase {
  constructor(private bankingRepository: IBankingRepository) {}

  async execute(payerId: string): Promise<BankingEntity> {
    const data: createBankingDTO = { payerId, balance: 0 };
    return await this.bankingRepository.create(data);
  }
}
