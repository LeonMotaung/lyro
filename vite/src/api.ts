// API Configuration
// Automatically uses the correct API URL based on environment

const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:3000' : 'https://lyro-backend.onrender.com');

export const apiClient = {
    baseURL: API_URL,

    async fetch(endpoint: string, options: RequestInit = {}) {
        const url = `${API_URL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return response;
    },

    async get(endpoint: string) {
        return this.fetch(endpoint);
    },

    async post(endpoint: string, data: any) {
        return this.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async put(endpoint: string, data: any) {
        return this.fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async delete(endpoint: string) {
        return this.fetch(endpoint, {
            method: 'DELETE',
        });
    },
};

export default apiClient;
