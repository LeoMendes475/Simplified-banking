import pino from 'pino';

import { INewCustomerDTO, UserResponse } from '../../dto/user.dto';
import { CreateBankingUseCase } from '../banking/create-banking.use-case';
import { CreatePayerUseCase } from '../payer/create-payer.use-case';
import { CreateUserUseCase } from './create-user.use-case';
import { IPayerRepository } from '../../../domain/repositories/i-payer.repository';
import { IUserRepository } from '../../../domain/repositories/i-user.repository';
import { IBankingRepository } from '../../../domain/repositories/i-banking.repository';

export class RegisterNewCustomerUseCase {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private userRepository: IUserRepository,
    private createPayerUseCase: CreatePayerUseCase,
    private payerRepository: IPayerRepository,
    private createBankingUseCase: CreateBankingUseCase,
    private bankingRepository: IBankingRepository,
  ) {}

  async execute(data: INewCustomerDTO): Promise<UserResponse> {
    const logger = pino();

    const user = await this.createUserUseCase.execute(data);
    logger.info(`User with email ${data.email} created successfully`);
    if (!user) {
      logger.error(`Failed to create user with email ${data.email}`);
      throw new Error('Failed to create user');
    }

    let payer = await this.payerRepository.findOneByCpf(data.cpf);
    if (!payer) {
      payer = await this.createPayerUseCase.execute(data);
      logger.info(`Payer with CPF ${data.cpf} created successfully`);
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
