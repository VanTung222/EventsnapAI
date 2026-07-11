import { create } from 'zustand';

type UserRole = 'attendee' | 'organizer' | 'admin' | 'check-in';

type AuthState = {
  user: null | { id: string; name: string; role: UserRole };
  isAuthenticated: boolean;
  login: (user: { id: string; name: string; role: UserRole }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
