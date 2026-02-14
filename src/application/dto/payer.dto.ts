import * as z from 'zod';
import { cpfSchema } from '../../shared/utils/validators';

export const createPayerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.email({ pattern: z.regexes.email }).min(3, 'Email invalido'),
  cpf: cpfSchema,
});

export type ICreatePayerDTO = z.infer<typeof createPayerSchema>;
