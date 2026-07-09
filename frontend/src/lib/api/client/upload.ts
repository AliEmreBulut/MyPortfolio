import { apiClient } from '../../axios';

export interface UploadResponse {
    url: string;
}

export const uploadClient = {
    uploadFile: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post<UploadResponse>('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data.url;
    },
    uploadImage: async (file: File): Promise<string> => {
        return uploadClient.uploadFile(file);
    }
};
