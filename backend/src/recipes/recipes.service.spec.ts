import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipes.entity';

const mockRecipesRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('RecipesService', () => {
  let service: RecipesService;
  let repository: Repository<Recipe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockRecipesRepository,
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
    repository = module.get<Repository<Recipe>>(getRepositoryToken(Recipe));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma nova receita', async () => {
      const createRecipeDto = { title: 'Bolo', description: '...', ingredients: ['farinha'], instructions: '...' };
      const userId = 1;
      const newRecipe = { id: 1, ...createRecipeDto, user: { id: userId } };

      mockRecipesRepository.create.mockReturnValue(newRecipe);
      mockRecipesRepository.save.mockResolvedValue(newRecipe);

      const result = await service.create(createRecipeDto, userId);

      expect(mockRecipesRepository.create).toHaveBeenCalledWith({ ...createRecipeDto, user: { id: userId } });
      expect(mockRecipesRepository.save).toHaveBeenCalledWith(newRecipe);
      expect(result).toEqual(newRecipe);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as receitas', async () => {
      const recipes = [{ id: 1, title: 'Bolo' }];
      mockRecipesRepository.find.mockResolvedValue(recipes);

      const result = await service.findAll();

      expect(mockRecipesRepository.find).toHaveBeenCalled();
      expect(result).toEqual(recipes);
    });
  });

  describe('findOne', () => {
    it('deve retornar uma receita pelo ID', async () => {
      const recipe = { id: 1, title: 'Bolo' };
      mockRecipesRepository.findOne.mockResolvedValue(recipe);

      const result = await service.findOne(1);

      expect(mockRecipesRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(recipe);
    });
  });
});