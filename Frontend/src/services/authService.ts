import { axiosClient } from './axiosClient';
import type { User, UserRole } from '../types';

export type AuthResponse = {
  accessToken: string;
  expiresAt: string;
  user: User;
  redirectPath: string;
};

export const authService = {
  login: (payload: { email: string; password: string }) => axiosClient.post<AuthResponse>('/auth/login', payload),
  register: (payload: { name: string; email: string; password: string; role?: UserRole }) => axiosClient.post<AuthResponse>('/auth/register', payload),
  loginWithGoogle: (payload: { idToken: string }) => axiosClient.post<AuthResponse>('/auth/google', payload),
  me: () => axiosClient.get<User>('/auth/me'),
  logout: () => axiosClient.post('/auth/logout'),
};