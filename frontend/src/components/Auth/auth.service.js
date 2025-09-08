import api from '../../axios-config';
import router from '../../router';
import { setIsAuthenticated } from './auth.state';

export const handleLogout = async () => {
  try {
    await api.post('/auth/logout');
    setIsAuthenticated(false);
    router.push('/login');
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
  }
};

export const handleLoggedIn = async () => {
  setIsAuthenticated(true);
};