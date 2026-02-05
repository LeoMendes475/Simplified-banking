import { Repository } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/i-user.repository';
import { AppDataSource } from '../data-source-cli';
import { ICreateUserDTO } from '../../../application/dto/user.dto';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async create(data: ICreateUserDTO): Promise<UserEntity> {
    return this.repository.create(data);
  }
}
