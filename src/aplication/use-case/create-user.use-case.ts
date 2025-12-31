import { UserEntity } from '../../domain/entities/user.entity';
import { IUsersRepository } from '../../domain/repositories/user.repository';
import { ICreateUserDTO } from '../dto/user.dto';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<UserEntity> {
    const user = await this.usersRepository.create(data);
    return user;
  }
}
