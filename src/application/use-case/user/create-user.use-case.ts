import { UserEntity } from '../../../domain/entities/user.entity';
import { IUserRepository as IUserRepository } from '../../../domain/repositories/i-user.repository';
import { ICreateUserDTO } from '../../dto/user.dto';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<UserEntity> {
    return await this.userRepository.create(data);
  }
}
