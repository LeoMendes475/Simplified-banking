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
import { CreateBankingUseCase } from '../../../../application/use-case/banking/create-banking.use-case';
import { BankingRepository } from '../../repositories/banking.repository';

const userRoutes = Router();

const userRepository = new UserRepository();
const payerRepository = new PayerRepository();
const bankingRepository = new BankingRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const findOneByCpf = new FindOneByCpf(payerRepository);
const createBankingUseCase = new CreateBankingUseCase(bankingRepository);

const findPayerByCpfUseCase = new FindOneByCpf(payerRepository);
const createPayerUseCase = new CreatePayerUseCase(payerRepository, findPayerByCpfUseCase);
const registerNewCustomerUseCase = new RegisterNewCustomerUseCase(
  createUserUseCase,
  createPayerUseCase,
  findOneByCpf,
  createBankingUseCase,
  bankingRepository,
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

userRoutes.post('/', validateResource(createNewCustomerSchema), (req, res) =>
  userController.create(req, res),
);

userRoutes.get('/', (req, res) => userController.findAll(req, res));

userRoutes.get('/search', (req, res) => userController.findOne(req, res));

userRoutes.put('/:id', validateResource(updateUserSchema), (req, res) =>
  userController.update(req, res),
);

userRoutes.delete('/:id', (req, res) => userController.delete(req, res));

export { userRoutes };
