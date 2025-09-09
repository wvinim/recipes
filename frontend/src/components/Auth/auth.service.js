import api from '../../axios-config';
import router from '../../router';

export const handleLogout = async () => {
  try {
    await api.post('/auth/logout');
    router.push('/login');
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
  }
};