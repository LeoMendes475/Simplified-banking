import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase } from '../../../../application/use-case/user/create-user.use-case';
import { UserRepository } from '../../repositories/user.repository';
import { validateResource } from '../../../middlewares/validateResource';
import { createNewCustomerSchema } from '../../../../application/dto/user.dto';
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

const userController = new UserController(registerNewCustomerUseCase);

userRoutes.post('/', validateResource(createNewCustomerSchema), (req, res) =>
  userController.create(req, res),
);

userRoutes.get('/:id', (req, res) => {
  return res.json({ id: req.params.id });
});

export { userRoutes };
