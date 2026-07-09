import { apiClient } from '../../axios';
import { SkillResponse } from '@/types/skill';

export interface CreateSkillRequest {
    name: string;
    iconName?: string;
    iconUrl?: string;
    category: number; // 0=Frontend, 1=Backend, 2=DevOps, 3=Database, 4=Mobile, 5=Architecture, 6=Other
}

export type UpdateSkillRequest = CreateSkillRequest;

export const skillClient = {
    getSkills: async (): Promise<SkillResponse[]> => {
        const response = await apiClient.get<SkillResponse[]>('/skills');
        return response.data;
    },
    createSkill: async (data: CreateSkillRequest): Promise<SkillResponse> => {
        const response = await apiClient.post<SkillResponse>('/skills', data);
        return response.data;
    },
    updateSkill: async (id: string, data: UpdateSkillRequest): Promise<void> => {
        await apiClient.put(`/skills/${id}`, data);
    },
    deleteSkill: async (id: string): Promise<void> => {
        await apiClient.delete(`/skills/${id}`);
    }
};
