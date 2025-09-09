import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateRecipe from './CreateRecipe.vue';
import api from '../../axios-config';

describe('CreateRecipe Component', () => {
  it('deve renderizar o formulário de cadastro de receita', () => {
    const wrapper = mount(CreateRecipe);

    expect(wrapper.find('input[id="title"]').exists()).toBe(true);
    expect(wrapper.find('textarea[id="description"]').exists()).toBe(true);
    expect(wrapper.find('textarea[id="ingredients"]').exists()).toBe(true);
    expect(wrapper.find('textarea[id="instructions"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('deve fazer a requisição para a API com os dados e o token', async () => {
    const wrapper = mount(CreateRecipe);

    const mockRecipeData = {
      title: 'Bolo de Chocolate',
      description: 'Um delicioso bolo de chocolate...',
      ingredients: 'Farinha, Açúcar, Chocolate em pó',
      instructions: 'Misture os ingredientes e asse.',
    };

    api.post.mockResolvedValue({ status: 201 });

    await wrapper.find('input[id="title"]').setValue(mockRecipeData.title);
    await wrapper.find('textarea[id="description"]').setValue(mockRecipeData.description);
    await wrapper.find('textarea[id="ingredients"]').setValue(mockRecipeData.ingredients);
    await wrapper.find('textarea[id="instructions"]').setValue(mockRecipeData.instructions);

    await wrapper.find('form').trigger('submit');

    expect(api.post).toHaveBeenCalledWith('/recipes', {
      title: mockRecipeData.title,
      description: mockRecipeData.description,
      ingredients: ['Farinha', 'Açúcar', 'Chocolate em pó'],
      instructions: mockRecipeData.instructions,
    });
  });
});