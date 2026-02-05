import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../../application/use-case/user/create-user.use-case';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, payerId, role } = req.body;

      const user = await this.createUserUseCase.execute({ name, email, password, payerId, role });

      return res.status(201).json(user);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error || 'Unexpected error.',
      });
    }
  }
}
