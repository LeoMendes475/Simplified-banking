import { Request, Response } from 'express';
import { RegisterNewCustomerUseCase } from '../../../../application/use-case/user/register-new-customer';
import { createNewCustomerSchema } from '../../../../application/dto/user.dto';

export class UserController {
  constructor(private registerNewCustomerUseCase: RegisterNewCustomerUseCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const newUser = createNewCustomerSchema.safeParse(req.body);

      const user = await this.registerNewCustomerUseCase.execute(newUser);

      return res.status(201).json(user);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error || 'Unexpected error.',
      });
    }
  }
}
