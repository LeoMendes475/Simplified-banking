import { Repository } from 'typeorm';
import { ICreatePayerDTO } from '../../../application/dto/payer.dto';
import { PayerEntity } from '../../../domain/entities/payer.entity';
import { IPayerRepository } from '../../../domain/repositories/i-payer.repository';
import { AppDataSource } from '../data-source-cli';

export class PayerRepository implements IPayerRepository {
  private repository: Repository<PayerEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(PayerEntity);
  }

  async create(data: ICreatePayerDTO): Promise<PayerEntity> {
    return this.repository.create(data);
  }

  async findOneById(id: number): Promise<PayerEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneByCpf(cpf: string): Promise<PayerEntity | null> {
    return this.repository.findOneBy({ cpf });
  }
}
