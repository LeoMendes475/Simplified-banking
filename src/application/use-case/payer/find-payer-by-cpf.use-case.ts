import { PayerEntity } from '../../../domain/entities/payer.entity';
import { PayerRepository } from '../../../infrastructure/db/repositories/payer.repository';

export class FindOneByCpf {
  constructor(private payerRepository: PayerRepository) {}

  async execute(cpf: string): Promise<PayerEntity | null> {
    return this.payerRepository.findOneByCpf(cpf);
  }
}
