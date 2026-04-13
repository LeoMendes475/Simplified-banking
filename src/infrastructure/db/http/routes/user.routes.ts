import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase } from '../../../../application/use-case/user/create-user.use-case';
import { FindAllUsersUseCase } from '../../../../application/use-case/user/find-all-users.use-case';
import { UpdateUserUseCase } from '../../../../application/use-case/user/update-user.use-case';
import { DeleteUserUseCase } from '../../../../application/use-case/user/delete-user.use-case';
import { UserRepository } from '../../repositories/user.repository';
import { validateResource } from '../../../middlewares/validateResource';
import { createNewCustomerSchema, updateUserSchema } from '../../../../application/dto/user.dto';
import { CreatePayerUseCase } from '../../../../application/use-case/payer/create-payer.use-case';
import { PayerRepository } from '../../repositories/payer.repository';
import { RegisterNewCustomerUseCase } from '../../../../application/use-case/user/register-new-customer';
import { FindOneByCpf } from '../../../../application/use-case/payer/find-payer-by-cpf.use-case';

const userRoutes = Router();

const userRepository = new UserRepository();
const payerRepository = new PayerRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

const findPayerByCpfUseCase = new FindOneByCpf(payerRepository);
const createPayerUseCase = new CreatePayerUseCase(payerRepository, findPayerByCpfUseCase);
const registerNewCustomerUseCase = new RegisterNewCustomerUseCase(
  createUserUseCase,
  createPayerUseCase,
);

const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController({
  registerNewCustomerUseCase,
  findAllUsersUseCase,
  updateUserUseCase,
  deleteUserUseCase,
});

// Criar usuário
userRoutes.post('/', validateResource(createNewCustomerSchema), (req, res) =>
  userController.create(req, res),
);

// Listar todos os usuários
userRoutes.get('/', (req, res) => userController.findAll(req, res));

// Buscar usuário por id, cpf, email ou username
userRoutes.get('/search', (req, res) => userController.findOne(req, res));

// Atualizar usuário
userRoutes.put('/:id', validateResource(updateUserSchema), (req, res) =>
  userController.update(req, res),
);

// Deletar usuário
userRoutes.delete('/:id', (req, res) => userController.delete(req, res));

export { userRoutes };
