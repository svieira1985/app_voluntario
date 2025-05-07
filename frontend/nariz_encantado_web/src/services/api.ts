import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://app-usbzejhh.fly.dev';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getEvents = () => api.get('/api/events');
export const getEventById = (id: number) => api.get(`/api/events/${id}`);
export const registerForEvent = (eventId: number, userId: number) => 
  api.post(`/api/events/${eventId}/register`, { userId });

export const login = (email: string, password: string) => 
  api.post('/api/auth/login', { email, password });
export const register = (userData: any) => 
  api.post('/api/auth/register', userData);
export const forgotPassword = (email: string) => 
  api.post('/api/auth/reset-password', { email });

export const getUserProfile = () => api.get('/api/users/me');
export const updateUserProfile = (userData: any) => 
  api.put('/api/users/me', userData);
export const uploadDocument = (documentType: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);
  return api.post('/api/users/me/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
