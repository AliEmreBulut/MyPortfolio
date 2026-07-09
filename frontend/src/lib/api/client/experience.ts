import { apiClient } from '../../axios';

export enum ExperienceType {
  Job = 0,
  Internship = 1,
  Freelance = 2,
  Volunteer = 3,
  Education = 4,
  TrainingProgram = 5
}

export interface ExperienceResponse {
  id: string;
  title: string;
  company: string;
  description: string | null;
  location: string | null;
  startDate: string; 
  endDate: string | null; 
  type: ExperienceType;
  displayOrder: number;
}

export interface CreateExperienceRequest {
  title: string;
  company: string;
  description?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  type: ExperienceType;
  displayOrder: number;
  userId: string;
}

export interface UpdateExperienceRequest extends CreateExperienceRequest {
  id: string;
}

export const experienceClient = {
  getExperiences: async (): Promise<ExperienceResponse[]> => {
    const response = await apiClient.get<ExperienceResponse[]>('/experiences');
    return response.data;
  },

  getExperienceById: async (id: string): Promise<ExperienceResponse> => {
    const response = await apiClient.get<ExperienceResponse>(`/experiences/${id}`);
    return response.data;
  },

  createExperience: async (data: CreateExperienceRequest): Promise<ExperienceResponse> => {
    const response = await apiClient.post<ExperienceResponse>('/experiences', data);
    return response.data;
  },

  updateExperience: async (data: UpdateExperienceRequest): Promise<void> => {
    await apiClient.put(`/experiences/${data.id}`, data);
  },

  deleteExperience: async (id: string): Promise<void> => {
    await apiClient.delete(`/experiences/${id}`);
  }
};
