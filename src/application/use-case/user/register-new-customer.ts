import { INewCustomerDTO, UserResponse } from '../../dto/user.dto';
import { CreatePayerUseCase } from '../payer/create-payer.use-case';
import { CreateUserUseCase } from './create-user.use-case';

export class RegisterNewCustomerUseCase {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createPayerUseCase: CreatePayerUseCase,
  ) {}

  async execute(data: INewCustomerDTO): Promise<UserResponse> {
    const user = await this.createUserUseCase.execute(data);
    const payer = await this.createPayerUseCase.execute(data);

    return {
      user,
      payer,
    };
  }
}
