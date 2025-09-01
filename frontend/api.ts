// src/api.ts
import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;