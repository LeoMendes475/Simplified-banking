import { z } from 'zod';

export const createBankingSchema = z.object({
  payerId: z.string().min(3, 'O ID do pagador deve ter no mínimo 3 caracteres'),
  balance: z.number().min(0, 'O saldo deve ser um número positivo'),
});

export type createBankingDTO = z.infer<typeof createBankingSchema>;
