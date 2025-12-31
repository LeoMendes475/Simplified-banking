import { ICreateUserDTO } from '../../aplication/dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<UserEntity>;
}
