import { UserEntity } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/i-user.repository';
import { IUpdateUserDTO } from '../../dto/user.dto';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: IUpdateUserDTO): Promise<UserEntity | null> {
    return this.userRepository.update(id, data);
  }
}
