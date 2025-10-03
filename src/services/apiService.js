import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
//create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle auth errors globally
apiClient.interceptors.response.use(
    response => response,
        error => {
            if(error.response?.status === 401) {
                //Token expired or invalid
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
);

export const songsAPI = {
    add: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return apiClient.post('/api/songs', formData, config);
    },
    list: () => apiClient.get('/api/songs'),
    remove: (id) => apiClient.delete(`/api/songs/${id}`),
    like: (id) => apiClient.post(`/api/songs/${id}/like`),
    unlike: (id) => apiClient.post(`/api/songs/${id}/unlike`)
};

export const albumsAPI = {
    add: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        };
        return apiClient.post('/api/albums', formData, config);
    },
    list: () => apiClient.get('/api/albums'),
    remove: (id) => apiClient.delete(`/api/albums/${id}`),
    like: (id) => apiClient.post(`/api/albums/${id}/like`),
    unlike: (id) => apiClient.post(`/api/albums/${id}/unlike`),
    updateSubscription: (id, plan) => apiClient.put(`/api/albums/${id}/subscription`, { plan })
};

export default apiClient;
