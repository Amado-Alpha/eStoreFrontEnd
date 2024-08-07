import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // Adjust this URL to your Laravel app
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    // const token = "2|Wq8Fz8CCNkBFOntqevrHDQKMwjX7Ly1NgVM5xhjC8a6ed5e7";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
