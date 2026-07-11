import { axiosClient } from './axiosClient';

export const eventService = {
  getAll: () => axiosClient.get('/events'),
  getById: (id: string) => axiosClient.get(`/events/${id}`),
  create: (payload: Record<string, unknown>) => axiosClient.post('/events', payload),
};
