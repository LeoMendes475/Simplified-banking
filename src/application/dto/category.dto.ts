import * as z from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
});

export type ICreateCategoryDTO = z.infer<typeof createCategorySchema>;
