import axios, { AxiosError, AxiosResponse } from 'axios';
import { APIError } from './types';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AWDB_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const apiError: APIError = {
      message: error.message || 'An error occurred',
      code: error.code || 'UNKNOWN_ERROR',
      details: error.response?.data,
    };

    console.error('API Error:', apiError);
    return Promise.reject(apiError);
  }
);
