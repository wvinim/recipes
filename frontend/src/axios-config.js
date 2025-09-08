import axios from 'axios';
import { handleLogout, handleLoggedIn } from './components/Auth/auth.service';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    handleLoggedIn()
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout()
    }
    return Promise.reject(error);
  }
);

export default api;