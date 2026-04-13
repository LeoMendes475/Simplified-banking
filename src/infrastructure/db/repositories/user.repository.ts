import { Repository } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/i-user.repository';
import { AppDataSource } from '../data-source-cli';
import { ICreateUserDTO, IUpdateUserDTO } from '../../../application/dto/user.dto';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async create(data: ICreateUserDTO): Promise<UserEntity> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async update(id: string, data: IUpdateUserDTO): Promise<UserEntity | null> {
    await this.repository.update(id, data);
    const updated = await this.repository.findOneBy({ id });
    return updated || null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
