import * as z from 'zod';
import { cpfSchema } from '../../shared/utils/validators';
import { UserEntity } from '../../domain/entities/user.entity';
import { PayerEntity } from '../../domain/entities/payer.entity';

export const createUserSchema = z.object({
  email: z.email({ pattern: z.regexes.email }).min(3, 'Email invalido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  roleId: z.string('É necessario o roleId'),
  payerId: z.string('É necessario o payerId'),
});

export const createNewCustomerSchema = z.object({
  cpf: cpfSchema,
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.email({ pattern: z.regexes.email }).min(3, 'Email invalido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  roleId: z.string('É necessario o roleId'),
  payerId: z.string('É necessario o payerId'),
});

export const userResponseSchema = z.object({
  user: z.instanceof(UserEntity),
  payer: z.instanceof(PayerEntity),
});

export type ICreateUserDTO = z.infer<typeof createUserSchema>;
export type INewCustomerDTO = z.infer<typeof createNewCustomerSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
