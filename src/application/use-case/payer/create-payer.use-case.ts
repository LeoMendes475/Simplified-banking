import { PayerEntity } from '../../../domain/entities/payer.entity';
import { IPayerRepository } from '../../../domain/repositories/i-payer.repository';
import { ICreatePayerDTO } from '../../dto/payer.dto';
import { FindOneByCpf } from './find-payer-by-cpf.use-case';

export class CreatePayerUseCase {
  constructor(
    private payerRepository: IPayerRepository,
    private findPayerByCpfUseCase: FindOneByCpf,
  ) {}

  async execute(data: ICreatePayerDTO): Promise<PayerEntity> {
    const ExistPayer = this.findPayerByCpfUseCase.execute(data.cpf);

    if (!ExistPayer) throw new Error('The payer already exist');

    const payer = this.payerRepository.create(data);
    return payer;
  }
}
