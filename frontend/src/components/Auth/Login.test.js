import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Login from './Login.vue';
import api from '../../axios-config';

describe('Login Component', () => {
  it('deve renderizar o formulário de login', () => {
    const wrapper = mount(Login);

    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('deve fazer a requisição de login com sucesso', async () => {
    const wrapper = mount(Login);

    await wrapper.find('input[type="email"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('senha123');

    await wrapper.find('form').trigger('submit');

    expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'user@example.com',
        password: 'senha123',
    });
  });

  it('deve exibir uma mensagem de erro em caso de falha no login', async () => {
    const wrapper = mount(Login);

    api.post.mockRejectedValue({
      response: {
        data: {
          message: 'Credenciais inválidas.',
        },
      },
    });

    await wrapper.find('input[type="email"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('senhainvalida');

    await wrapper.find('form').trigger('submit');

    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toContain('Credenciais inválidas.');
  });
});