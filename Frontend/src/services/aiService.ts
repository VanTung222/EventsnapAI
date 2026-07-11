import { axiosClient } from './axiosClient';

export const aiService = {
  generatePoster: (payload: Record<string, unknown>) => axiosClient.post('/ai/poster', payload),
};
