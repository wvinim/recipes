import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeList from './RecipeList.vue';
import api from '../../axios-config';

vi.mock('../../axios-config');

describe('RecipeList Component', () => {
  it('deve buscar e exibir uma lista de receitas', async () => {
    const mockRecipes = [
      { id: 1, title: 'Bolo de Chocolate', description: '...', ingredients: ['Farinha', 'Chocolate'], instructions: '...' },
      { id: 2, title: 'Torta de Limão', description: '...', ingredients: ['Limão', 'Leite Condensado'], instructions: '...' },
    ];

    api.get.mockResolvedValue({ data: mockRecipes });

    const wrapper = mount(RecipeList);

    await vi.waitFor(() => {
      expect(wrapper.findAll('.recipe-card')).toHaveLength(2);
    });

    expect(api.get).toHaveBeenCalledWith('/recipes');

    const recipeTitles = wrapper.findAll('h3');
    expect(recipeTitles.length).toBe(mockRecipes.length);
    expect(recipeTitles[0].text()).toContain('Bolo de Chocolate');
    expect(recipeTitles[1].text()).toContain('Torta de Limão');
  });

  it('deve exibir uma mensagem de erro se a busca falhar', async () => {
    api.get.mockRejectedValue({ response: { data: { message: 'Erro ao buscar receitas.' } } });

    const wrapper = mount(RecipeList);

    await vi.waitFor(() => {
      expect(wrapper.find('.error').exists()).toBe(true);
    });
    
    expect(wrapper.find('.error').text()).toContain('Erro ao buscar receitas.');
  });
});