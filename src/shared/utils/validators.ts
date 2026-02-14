import * as z from 'zod';

export const cpfSchema = z
  .string()
  .refine((doc) => {
    const replacedDoc = doc.replace(/\D/g, '');
    return replacedDoc.length === 11;
  }, 'CPF/CNPJ deve conter 11 caracteres.')
  .refine((doc) => {
    const replacedDoc = doc.replace(/\D/g, '');
    return /^\d+$/.test(replacedDoc);
  }, 'CPF deve conter apenas números.');
