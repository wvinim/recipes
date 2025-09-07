import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

const mockUsersService = {
  findOneByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('deve retornar o usuário se as credenciais forem válidas', async () => {
      const user = { id: 1, email: 'teste@email.com', password: 'hashedpassword' };
      const plainPassword = 'senhaforte';

      const bcrypt = require('bcrypt');
      
      mockUsersService.findOneByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);

      const result = await service.validateUser(user.email, plainPassword);

      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(user.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, user.password);
      expect(result).toEqual({ id: 1, email: user.email });
    });

    it('deve retornar null se a senha for inválida', async () => {
      const user = { id: 1, email: 'teste@email.com', password: 'hashedpassword' };

      const bcrypt = require('bcrypt');

      mockUsersService.findOneByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      const result = await service.validateUser(user.email, 'senhainvalida');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('deve retornar um token de acesso para o usuário', async () => {
      const user = { id: 1, email: 'teste@email.com' };
      const token = 'mock_jwt_token';

      mockJwtService.sign.mockReturnValue(token);

      const result = await service.login(user);

      expect(mockJwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
      expect(result).toEqual({ access_token: token });
    });
  });
});