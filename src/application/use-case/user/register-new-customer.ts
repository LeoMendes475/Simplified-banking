import pino from 'pino';

import { INewCustomerDTO, UserResponse } from '../../dto/user.dto';
import { CreateBankingUseCase } from '../banking/create-banking.use-case';
import { CreatePayerUseCase } from '../payer/create-payer.use-case';
import { CreateUserUseCase } from './create-user.use-case';
import { IPayerRepository } from '../../../domain/repositories/i-payer.repository';
import { IBankingRepository } from '../../../domain/repositories/i-banking.repository';

export class RegisterNewCustomerUseCase {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createPayerUseCase: CreatePayerUseCase,
    private payerRepository: IPayerRepository,
    private createBankingUseCase: CreateBankingUseCase,
    private bankingRepository: IBankingRepository,
  ) {}

  async execute(data: INewCustomerDTO): Promise<UserResponse> {
    const logger = pino();

    let payer = await this.payerRepository.findOneByCpf(data.cpf);
    if (!payer) {
      payer = await this.createPayerUseCase.execute({
        cpf: data.cpf,
        email: data.email,
        name: data.name,
      });
      logger.info(`Payer with CPF ${data.cpf} created successfully`);
    }

    const user = await this.createUserUseCase.execute({
      email: data.email,
      password: data.password,
      payerId: payer.id,
      roleId: data.roleId,
    });
    logger.info(`User with email ${data.email} created successfully`);
    if (!user) {
      logger.error(`Failed to create user with email ${data.email}`);
      throw new Error('Failed to create user');
    }

    let banking = await this.bankingRepository.findOneByPayerId(payer.id);
    if (!banking) {
      banking = await this.createBankingUseCase.execute(payer.id);
      logger.info(`Banking for payer ID ${payer.id} created successfully`);
    }

    return {
      user,
      payer,
      banking,
    };
  }
}
