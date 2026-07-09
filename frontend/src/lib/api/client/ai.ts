import { apiClient } from '../../axios';

export interface AiChatRequest {
  message: string;
}

export interface AiChatResponse {
  answer: string;
}

export const aiClient = {
  async chat(message: string): Promise<string> {
    const { data } = await apiClient.post<AiChatResponse>("/ai/chat", { message });
    return data.answer;
  }
};
