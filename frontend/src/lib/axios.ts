import axios from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Request Interceptor her istekte araya girerek token kontrolü yapıyor
apiClient.interceptors.request.use(async (config) => {
  if (typeof window != 'undefined') {
    const token = Cookies.get('jwt_token');

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

//Response Interceptor yanıtları kontrol eder
apiClient.interceptors.response.use( (response) => response,
(error) => {
  if(error.response?.status === 401){
    console.warn("Yetkisiz erişim! Token geçersiz veya süresi dolmuş...")
  }
  return Promise.reject(error);
}
);