import { create } from 'zustand';
import type { User, UserRole } from '../types';

type StoredAuth = {
  user: User;
  token: string;
};

type AuthState = {
  user: null | User;
  token: null | string;
  isAuthenticated: boolean;
  login: (payload: StoredAuth) => void;
  logout: () => void;
  canAccess: (roles: UserRole[]) => boolean;
};

const readStoredAuth = (): StoredAuth | null => {
  const token = localStorage.getItem('eventsnap_token');
  const userRaw = localStorage.getItem('eventsnap_user');
  if (!token || !userRaw) return null;

  try {
    return { token, user: JSON.parse(userRaw) as User };
  } catch {
    localStorage.removeItem('eventsnap_token');
    localStorage.removeItem('eventsnap_user');
    return null;
  }
};

const storedAuth = readStoredAuth();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: storedAuth?.user ?? null,
  token: storedAuth?.token ?? null,
  isAuthenticated: Boolean(storedAuth?.token && storedAuth?.user),
  login: ({ user, token }) => {
    localStorage.setItem('eventsnap_token', token);
    localStorage.setItem('eventsnap_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('eventsnap_token');
    localStorage.removeItem('eventsnap_user');
    set({ user: null, token: null, isAuthenticated: false });
  },
  canAccess: (roles) => {
    const role = get().user?.role;
    if (!role) return false;
    return role === 'admin' || roles.includes(role);
  },
}));