import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Retrieving token from local storage so that we can access the secured roots.
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// export default {
//     register(user) {
//         return apiClient.post('/register', user);
//     },
//     login(credentials) {
//         return apiClient.post('/login', credentials);
//     },
//     logout() {
//         return apiClient.post('/logout');
//     },
// };

export default apiClient;
