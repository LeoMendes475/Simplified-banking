import { CreateUserUseCase } from '../../../src/application/use-case/create-user.use-case';
import { IUsersRepository } from '../../../src/domain/repositories/user.repository';
import { UserEntity } from '../../../src/domain/entities/user.entity';
import { ICreateUserDTO } from '../../../src/application/dto/user.dto';
import { RoleEnum } from '../../../src/application/enum/role.enum';

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let usersRepository: jest.Mocked<IUsersRepository>;

    beforeEach(() => {
        usersRepository = {
            create: jest.fn(),
        } as unknown as jest.Mocked<IUsersRepository>;
        createUserUseCase = new CreateUserUseCase(usersRepository);
    });

    it('should create a user successfully', async () => {
        const createUserDTO: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: RoleEnum.USER,
            payerId: 123
        };

        const userEntity = new UserEntity({...createUserDTO, payer: { id: createUserDTO.payerId}});

        usersRepository.create.mockResolvedValue(userEntity);

        const result = await createUserUseCase.execute(createUserDTO);

        expect(result).toEqual(userEntity);
        expect(usersRepository.create).toHaveBeenCalledWith(createUserDTO);
        expect(usersRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when repository fails', async () => {
      

        // usersRepository.create.mockRejectedValue(new Error('Database error'));

        // await expect(createUserUseCase.execute(createUserDTO)).rejects.toThrow(
        //     'Database error'
        // );
    });
});