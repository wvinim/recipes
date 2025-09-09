import axios from 'axios';
import { handleLogout } from './components/Auth/auth.service';
import { Env } from './config/env'

const baseURL = `http://${Env.BACKEND_HOST}:${Env.BACKEND_PORT}`;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
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