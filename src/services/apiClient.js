import axios from 'axios';

// Get base URL from environment variable, with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7063';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle common response patterns
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      error.userMessage = error.response.data?.message || 
        `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request made but no response
      error.userMessage = 'Unable to reach the server. Please check your connection.';
    } else {
      error.userMessage = error.message || 'An unexpected error occurred';
    }
    return Promise.reject(error);
  }
);

export default apiClient;