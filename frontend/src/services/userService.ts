import axios from '@/lib/axios';
import type { User, Address, ApiResponse } from '@/types';

interface UpdateProfileData {
  name?: string;
  phone?: string;
  avatar?: File;
}

interface AddressData {
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  is_default?: boolean;
}

export const userService = {
  async getProfile(): Promise<User> {
    const response = await axios.get<ApiResponse<User>>('/user/profile');
    return response.data.data;
  },

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.phone) formData.append('phone', data.phone);
    if (data.avatar) formData.append('avatar', data.avatar);

    const response = await axios.post<ApiResponse<User>>(
      '/user/profile',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  async getAddresses(): Promise<Address[]> {
    const response = await axios.get<ApiResponse<Address[]>>(
      '/user/addresses'
    );
    return response.data.data;
  },

  async createAddress(data: AddressData): Promise<Address> {
    const response = await axios.post<ApiResponse<Address>>(
      '/user/addresses',
      data
    );
    return response.data.data;
  },

  async updateAddress(id: number, data: AddressData): Promise<Address> {
    const response = await axios.put<ApiResponse<Address>>(
      `/user/addresses/${id}`,
      data
    );
    return response.data.data;
  },

  async deleteAddress(id: number): Promise<void> {
    await axios.delete(`/user/addresses/${id}`);
  },
};
