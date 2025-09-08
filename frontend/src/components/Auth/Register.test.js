import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Register from './Register.vue';

const mockSubmit = vi.fn();

describe('Register Component', () => {
  it('should render a complete registration form', () => {
    const wrapper = mount(Register);
    
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
  
  it('should call the submit method when the form is submitted', async () => {
    const wrapper = mount(Register);

    await wrapper.find('input[type="email"]').setValue('user@example.com');
    await wrapper.find('input[type="password"]').setValue('senha123');
    
    wrapper.vm.submitForm = mockSubmit;
    
    await wrapper.find('form').trigger('submit');
    
    expect(mockSubmit).toHaveBeenCalled();
  });
});