import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

const mockUsersRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar e salvar um novo usuário', async () => {
      const createUserDto = {
        email: 'teste@email.com',
        password: 'senhaforte',
      };
      const hashedPassword = 'hashed_password_123';

      // Agora, importamos a função diretamente do módulo simulado
      const bcrypt = require('bcrypt');
      bcrypt.hash.mockResolvedValue(hashedPassword);

      const newUser = { ...createUserDto, password: hashedPassword };
      mockUsersRepository.create.mockReturnValue(newUser as any);
      mockUsersRepository.save.mockResolvedValue(newUser as any);

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockUsersRepository.create).toHaveBeenCalledWith({ email: createUserDto.email, password: hashedPassword });
      expect(mockUsersRepository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });
  });

  describe('findOneByEmail', () => {
    it('deve retornar um usuário se ele for encontrado', async () => {
      const user = { email: 'teste@email.com' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user as any);

      const result = await service.findOneByEmail('teste@email.com');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: 'teste@email.com' } });
      expect(result).toEqual(user);
    });
  });
});