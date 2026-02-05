import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase } from '../../../../application/use-case/user/create-user.use-case';
import { UserRepository } from '../../repositories/user.repository';

const userRoutes = Router();

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

userRoutes.post('/', (req, res) => {
  userController.create(req, res);
  return res.status(201).json({ message: 'User route working' });
});

userRoutes.get('/:id', (req, res) => {
  return res.json({ id: req.params.id });
});

export { userRoutes };
