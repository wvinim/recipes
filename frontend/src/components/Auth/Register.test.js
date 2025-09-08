// src/components/Auth/Register.test.js
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Register from './Register.vue';
import axios from 'axios';

vi.mock('axios');

describe('Register Component', () => {
  it('deve renderizar um formulário de cadastro completo', () => {
    const wrapper = mount(Register);
    
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
  
  it('deve fazer a requisição de cadastro com sucesso e exibir uma mensagem de sucesso', async () => {
    const wrapper = mount(Register);
    
    axios.post.mockResolvedValue({ status: 201, data: 'User created' });
    
    await wrapper.find('input[type="email"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('senha123');

    await wrapper.find('form').trigger('submit');
    
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users/register', {
      email: 'user@example.com',
      password: 'senha123',
    });
    
    await wrapper.vm.$nextTick();
  });
});