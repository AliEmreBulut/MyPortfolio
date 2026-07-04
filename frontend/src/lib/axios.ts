import axios from 'axios';
import { error } from 'console';
import { config } from 'process';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  if (typeof window != 'undefined') {
    const token = localStorage.getItem('jwt_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;

    }
  }
  return config;
},
(error) => {
  return Promise.reject(error);
}
);


apiClient.interceptors.response.use( (response) => response,
(error) => {
  if(error.response?.status === 401){
    console.warn("Yetkisiz erişim! Token geçersiz veya süresi dolmuş...")
  }
  return Promise.reject(error);
}
);