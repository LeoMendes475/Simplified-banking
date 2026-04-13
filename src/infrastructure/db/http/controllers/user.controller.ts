import { Request, Response } from 'express';
import { RegisterNewCustomerUseCase } from '../../../../application/use-case/user/register-new-customer';

export class UserController {
  constructor(private registerNewCustomerUseCase: RegisterNewCustomerUseCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.registerNewCustomerUseCase.execute(req.body);

      return res.status(201).json(user);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error || 'Unexpected error.',
      });
    }
  }
}
