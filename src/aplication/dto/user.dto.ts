import { RoleEnum } from '../enum/role.enum';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: RoleEnum;
}
