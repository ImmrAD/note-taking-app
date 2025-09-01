// src/api.ts
import axios from 'axios';

// Add this line for debugging
console.log('VITE_APP_API_URL:', import.meta.env.VITE_APP_API_URL);

// The rest of your file stays the same
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;