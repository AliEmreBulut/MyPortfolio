import { apiClient } from '../../axios';
import { UserProfileResponse } from '@/types/user';

export interface UpdateUserProfileRequest {
    fullName: string;
    title: string;
    shortSummary?: string;
    heroCodeSnippet?: string;
    aboutText?: string;
    profileImageUrl?: string;
    resumeUrl?: string;
    email?: string;
    phone?: string;
    gitHubUrl?: string;
    linkedInUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
}

export const profileClient = {
    getProfile: async (): Promise<UserProfileResponse> => {
        const response = await apiClient.get<UserProfileResponse>('/user/profile');
        return response.data;
    },
    updateProfile: async (data: UpdateUserProfileRequest): Promise<void> => {
        await apiClient.put('/user/profile', data);
    }
};
