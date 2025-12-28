import apiClient from '@/lib/axios';
import { User, Address, ApiResponse } from '@/types';

interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
}

interface CreateAddressData {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

type UpdateAddressData = Partial<CreateAddressData>;

class UserService {
  /**
   * Récupérer le profil utilisateur
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/user/profile');
    return response.data.data;
  }

  /**
   * Mettre à jour le profil
   */
  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>('/user/profile', data);
    return response.data.data;
  }

  /**
   * Récupérer les adresses
   */
  async getAddresses(): Promise<Address[]> {
    const response = await apiClient.get<ApiResponse<Address[]>>('/user/addresses');
    return response.data.data;
  }

  /**
   * Créer une nouvelle adresse
   */
  async createAddress(data: CreateAddressData): Promise<Address> {
    const response = await apiClient.post<ApiResponse<Address>>('/user/addresses', data);
    return response.data.data;
  }

  /**
   * Mettre à jour une adresse
   */
  async updateAddress(id: number, data: UpdateAddressData): Promise<Address> {
    const response = await apiClient.put<ApiResponse<Address>>(`/user/addresses/${id}`, data);
    return response.data.data;
  }

  /**
   * Supprimer une adresse
   */
  async deleteAddress(id: number): Promise<void> {
    await apiClient.delete(`/user/addresses/${id}`);
  }
}

export default new UserService();