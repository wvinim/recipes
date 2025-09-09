import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Register from './Register.vue';
import api from '../../axios-config';

describe('Register Component', () => {
  it('deve renderizar um formulário de cadastro completo', () => {
    const wrapper = mount(Register);
    
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
  
  it('deve fazer a requisição de cadastro com sucesso e exibir uma mensagem de sucesso', async () => {
    const wrapper = mount(Register);
    
    api.post.mockResolvedValue({ status: 201, data: 'User created' });
    
    await wrapper.find('input[type="email"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('senha123');

    await wrapper.find('form').trigger('submit');
    
    expect(api.post).toHaveBeenCalledWith('/users/register', {
      email: 'user@example.com',
      password: 'senha123',
    });
    
    await wrapper.vm.$nextTick();
  });
});