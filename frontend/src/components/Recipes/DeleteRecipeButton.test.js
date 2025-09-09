import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DeleteRecipeButton from './DeleteRecipeButton.vue';
import api from '../../axios-config';

describe('DeleteRecipeButton Component', () => {
  it('deve enviar uma requisição DELETE com o id correto ao ser clicado', async () => {
    const recipeId = '123';
    
    api.delete.mockResolvedValue({ status: 200 });
    
    const wrapper = mount(DeleteRecipeButton, {
      props: {
        recipeId: recipeId,
      },
    });

    const deleteButton = wrapper.find('button');
    await deleteButton.trigger('click');
    
    expect(api.delete).toHaveBeenCalledWith(`/recipes/${recipeId}`);
  });
});