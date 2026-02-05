import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../../application/use-case/user/create-user.use-case';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, payerId, roleId } = req.body;

      const user = await this.createUserUseCase.execute({ email, password, payerId, roleId });

      return res.status(201).json(user);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error || 'Unexpected error.',
      });
    }
  }
}
