import axios from '@/lib/axios';
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ApiResponse,
} from '@/types';

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      data
    );
    return response.data.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return response.data.data;
  },

  async logout(): Promise<void> {
    await axios.post('/auth/logout');
  },

  async me(): Promise<User> {
    const response = await axios.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await axios.post('/auth/forgot-password', { email });
  },
};
