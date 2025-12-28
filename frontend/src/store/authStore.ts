import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '@/types';
import { authService } from '@/services';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const authData = await authService.login(credentials);
          set({
            user: authData.user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Erreur de connexion';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const authData = await authService.register(data);
          set({
            user: authData.user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Erreur d\'inscription';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      checkAuth: async () => {
        const token = authService.getToken();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        try {
          const user = await authService.me();
          set({ user, isAuthenticated: true, token });
        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);