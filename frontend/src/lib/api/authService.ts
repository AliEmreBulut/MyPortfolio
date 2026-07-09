import { apiClient } from '../axios';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  expiration: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>('/auth/login', credentials);
    return response.data;
  },
};
