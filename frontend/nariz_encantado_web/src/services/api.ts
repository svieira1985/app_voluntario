import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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

export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/token', 
      new URLSearchParams({
        'username': username,
        'password': password
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  resetPassword: async (email: string) => {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  
  createAdmin: async (userData: any) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  
  updateUserRole: async (userId: number, isAdmin: boolean) => {
    const response = await api.patch(`/admin/users/${userId}/role`, { is_admin: isAdmin });
    return response.data;
  },
};

export const eventService = {
  getEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  
  getEvent: async (id: number) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  
  getEventByRegistrationLink: async (registrationLink: string) => {
    const response = await api.get(`/events/register/${registrationLink}`);
    return response.data;
  },
  
  registerForEvent: async (eventId: number) => {
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
  },
  
  createEvent: async (eventData: any) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },
  
  updateEvent: async (id: number, eventData: any) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },
  
  deleteEvent: async (id: number) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
  
  generateRegistrationLink: async (eventId: number) => {
    const response = await api.post(`/events/${eventId}/generate-link`);
    return response.data;
  },
  
  uploadEventImage: async (eventId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/events/${eventId}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const userService = {
  getUserEvents: async () => {
    const response = await api.get('/users/me/events');
    return response.data;
  },
  
  getUserDocuments: async () => {
    const response = await api.get('/users/me/documents');
    return response.data;
  },
  
  uploadDocument: async (documentType: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/users/me/documents?document_type=${documentType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const financialService = {
  getFinancialRecords: async () => {
    const response = await api.get('/financial');
    return response.data;
  },
  
  createFinancialRecord: async (recordData: any) => {
    const response = await api.post('/financial', recordData);
    return response.data;
  },
  
  uploadFinancialDocument: async (recordId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/financial/${recordId}/upload-document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getFinancialSummary: async () => {
    const response = await api.get('/financial/summary');
    return response.data;
  },
};

export default api;
