import { ref } from 'vue';

export const isAuthenticated = ref(false);

export const setIsAuthenticated = (value) => {
  isAuthenticated.value = value;
};