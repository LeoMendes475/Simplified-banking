import { IUserRepository } from '../../../domain/repositories/i-user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';

export class FindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}
