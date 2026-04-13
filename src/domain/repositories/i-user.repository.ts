import { ICreateUserDTO } from '../../application/dto/user.dto';
import { UserEntity } from '../entities/user.entity';

import { IUpdateUserDTO } from '../../application/dto/user.dto';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, data: IUpdateUserDTO): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
}
