import pino from 'pino';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/i-user.repository';
import { ICreateUserDTO } from '../../dto/user.dto';

export class CreateUserUseCase {
  // Otimização: Instancie o logger uma única vez ou receba via injeção
  private logger = pino();

  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<UserEntity> {
    try {
      // 1. Verifica se o usuário já existe
      const existingUser = await this.userRepository.findByEmail(data.email);

      if (existingUser) {
        this.logger.info(`User with email ${data.email} already exists. Returning existing user.`);
        return existingUser; // Retorno para manter a idempotência
      }

      // 2. Se não existe, cria o novo usuário
      const newUser = await this.userRepository.create(data);

      // Garante que o retorno não seja nulo para satisfazer o Promise<UserEntity>
      if (!newUser) {
        throw new Error('Database failed to create user');
      }

      return newUser;
    } catch (error: unknown) {
      // 3. Tratamento do erro 'unknown'
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      this.logger.error(`Error in CreateUserUseCase: ${errorMessage}`);

      // Lança o erro novamente para o "orquestrador" saber que algo falhou
      throw new Error(`Failed to process user creation: ${errorMessage}`);
    }
  }
}
