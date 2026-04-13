import { Request, Response } from 'express';
import { RegisterNewCustomerUseCase } from '../../../../application/use-case/user/register-new-customer';
import { FindAllUsersUseCase } from '../../../../application/use-case/user/find-all-users.use-case';
import { UpdateUserUseCase } from '../../../../application/use-case/user/update-user.use-case';
import { DeleteUserUseCase } from '../../../../application/use-case/user/delete-user.use-case';

interface IUserControllerDeps {
  registerNewCustomerUseCase: RegisterNewCustomerUseCase;
  findAllUsersUseCase: FindAllUsersUseCase;
  updateUserUseCase: UpdateUserUseCase;
  deleteUserUseCase: DeleteUserUseCase;
}

export class UserController {
  private registerNewCustomerUseCase: RegisterNewCustomerUseCase;
  private findAllUsersUseCase: FindAllUsersUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(deps: IUserControllerDeps) {
    this.registerNewCustomerUseCase = deps.registerNewCustomerUseCase;
    this.findAllUsersUseCase = deps.findAllUsersUseCase;
    this.updateUserUseCase = deps.updateUserUseCase;
    this.deleteUserUseCase = deps.deleteUserUseCase;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.registerNewCustomerUseCase.execute(req.body);
      return res.status(201).json(user);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : error || 'Unexpected error.',
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.findAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : error || 'Unexpected error.',
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const user = null;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : error || 'Unexpected error.',
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.updateUserUseCase.execute(id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error: unknown) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : error || 'Unexpected error.',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute(id);
      return res.status(204).send();
    } catch (error: unknown) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : error || 'Unexpected error.',
      });
    }
  }
}
