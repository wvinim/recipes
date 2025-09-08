import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ViewRecipe from './ViewRecipe.vue';
import api from '../../axios-config';

vi.mock('../../axios-config');

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRoute: vi.fn(() => ({
      params: {
        id: '1',
      },
    })),
  };
});

describe('ViewRecipe Component', () => {
  it('deve buscar e exibir os detalhes de uma receita', async () => {
    const mockRecipe = {
      id: 1,
      title: 'Salada de Frutas',
      description: 'Uma salada refrescante e saborosa.',
      ingredients: ['Morango', 'Banana', 'Maçã'],
      instructions: 'Corte as frutas, misture e sirva.',
    };

    api.get.mockResolvedValue({ data: mockRecipe });

    const wrapper = mount(ViewRecipe);

    await vi.waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/recipes/1');
      expect(wrapper.find('h3').text()).toContain(mockRecipe.title);
      expect(wrapper.find('p.description').text()).toContain(mockRecipe.description);
      expect(wrapper.find('p.ingredients').text()).toContain('Morango, Banana, Maçã');
      expect(wrapper.find('p.instructions').text()).toContain(mockRecipe.instructions);
    });
  });

  it('deve exibir uma mensagem de erro se a busca falhar', async () => {
    api.get.mockRejectedValue({ response: { data: { message: 'Receita não encontrada.' } } });

    const wrapper = mount(ViewRecipe);

    await vi.waitFor(() => {
      expect(wrapper.find('.error').exists()).toBe(true);
    });

    expect(wrapper.find('.error').text()).toContain('Receita não encontrada.');
  });
});