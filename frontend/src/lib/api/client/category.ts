import { apiClient } from '../../axios';


export interface CategoryResponse {
  id: string;
  name: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

export const categoryClient = {
  getCategories: async (): Promise<CategoryResponse[]> => {
    const response = await apiClient.get<CategoryResponse[]>('/categories');
    return response.data;
  },

  getCategoryById: async (id: string): Promise<CategoryResponse> => {
    const response = await apiClient.get<CategoryResponse>(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (data: CreateCategoryRequest): Promise<CategoryResponse> => {
    const response = await apiClient.post<CategoryResponse>('/categories', data);
    return response.data;
  },

  updateCategory: async (data: UpdateCategoryRequest): Promise<void> => {
    await apiClient.put(`/categories/${data.id}`, data);
  },

  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  }
};
