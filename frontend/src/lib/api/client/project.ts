import { apiClient } from '../../axios';
import { ProjectResponse } from '@/types/project';

export interface CreateProjectRequest {
    title: string;
    shortSummary?: string;
    detailedDescription?: string;
    coverImageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    displayOrder: number;
    status: number; // 0: Draft, 1: Published
    categoryIds: string[];
    skillIds: string[];
    galleryImageUrls: string[];
}

export type UpdateProjectRequest = CreateProjectRequest;

export const projectClient = {
    getProjects: async (): Promise<ProjectResponse[]> => {
        const response = await apiClient.get<ProjectResponse[]>('/projects');
        return response.data;
    },
    createProject: async (data: CreateProjectRequest): Promise<ProjectResponse> => {
        const response = await apiClient.post<ProjectResponse>('/projects', data);
        return response.data;
    },
    updateProject: async (id: string, data: UpdateProjectRequest): Promise<void> => {
        await apiClient.put(`/projects/${id}`, data);
    },
    deleteProject: async (id: string): Promise<void> => {
        await apiClient.delete(`/projects/${id}`);
    }
};
