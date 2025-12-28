export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'artisan' | 'customer';
  avatar?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  role: 'customer' | 'artisan';
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_at?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}