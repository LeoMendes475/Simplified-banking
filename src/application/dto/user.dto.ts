// import { RoleEnum } from '../enum/role.enum';

export interface ICreateUserDTO {
  email: string;
  password: string;
  roleId: string;
  payerId: string;
}
