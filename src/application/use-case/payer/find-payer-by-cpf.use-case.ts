import pino from 'pino';
import { PayerEntity } from '../../../domain/entities/payer.entity';
import { PayerRepository } from '../../../infrastructure/db/repositories/payer.repository';

const logger = pino();

export class FindOneByCpf {
  constructor(private payerRepository: PayerRepository) {}

  async execute(cpf: string): Promise<PayerEntity | null> {
    try {
      const payer = await this.payerRepository.findOneByCpf(cpf);

      if (!payer) {
        logger.info({ cpf }, 'Search completed: Payer not found in database.');
        return null;
      }

      return payer;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      logger.error(
        { error: errorMessage, cpf },
        'Critical error: Failed to access database while searching for CPF',
      );

      throw new Error('Database service is currently unavailable.');
    }
  }
}
