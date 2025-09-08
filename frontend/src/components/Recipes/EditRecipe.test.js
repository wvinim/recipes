import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import EditRecipe from './EditRecipe.vue';
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
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

describe('EditRecipe Component', () => {
  it('deve buscar e preencher o formulário para uma receita existente', async () => {
    const mockRecipe = {
      id: 1,
      title: 'Bolo de Morango',
      description: 'Um delicioso bolo de morango...',
      ingredients: ['Farinha', 'Ovos', 'Morango'],
      instructions: 'Misture tudo.',
    };

    api.get.mockResolvedValue({ data: mockRecipe });

    const wrapper = mount(EditRecipe);
    
    await vi.waitFor(() => {
      const titleInput = wrapper.find('input[id="title"]');
      const descriptionTextarea = wrapper.find('textarea[id="description"]');
    
      expect(api.get).toHaveBeenCalledWith('/recipes/1');
      expect(titleInput.element.value).toBe(mockRecipe.title);
      expect(descriptionTextarea.element.value).toBe(mockRecipe.description);
    });
  });

  it('deve enviar a requisição de atualização ao submeter o formulário', async () => {
    const mockRecipe = {
      id: 1,
      title: 'Bolo de Morango',
      description: 'Um delicioso bolo de morango...',
      ingredients: ['Farinha', 'Ovos', 'Morango'],
      instructions: 'Misture tudo.',
    };

    api.get.mockResolvedValue({ data: mockRecipe });
    api.put.mockResolvedValue({ status: 200 });
    
    const wrapper = mount(EditRecipe);

    await vi.waitFor(() => {
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    const updatedTitle = 'Bolo de Morango e Chantilly';
    await wrapper.find('input[id="title"]').setValue(updatedTitle);
    
    await wrapper.find('form').trigger('submit');

    expect(api.patch).toHaveBeenCalledWith('/recipes/1', {
      title: updatedTitle,
      description: mockRecipe.description,
      ingredients: mockRecipe.ingredients,
      instructions: mockRecipe.instructions,
    });
  });
});