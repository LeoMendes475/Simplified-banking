import { ICreatePayerDTO } from '../../application/dto/payer.dto';
import { PayerEntity } from '../entities/payer.entity';

export interface IPayerRepository {
  create(data: ICreatePayerDTO): Promise<PayerEntity>;
  findOneById(id: number): Promise<PayerEntity | null>;
  findOneByCpf(cpf: string): Promise<PayerEntity | null>;
}
