import { ICreateUserDTO } from '../../application/dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<UserEntity>;
}
