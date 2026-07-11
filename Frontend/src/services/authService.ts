import { axiosClient } from './axiosClient';

export const authService = {
  login: (payload: { email: string; password: string }) => axiosClient.post('/auth/login', payload),
  register: (payload: Record<string, unknown>) => axiosClient.post('/auth/register', payload),
  logout: () => axiosClient.post('/auth/logout'),
};
