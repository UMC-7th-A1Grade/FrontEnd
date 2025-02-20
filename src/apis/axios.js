// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,  // 절대 URL 사용
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// api.interceptors.request.use(
//   (config) => {
//     console.log('API Request:', {
//       url: config.url,
//       method: config.method,
//       params: config.params,
//       headers: config.headers
//     });
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     console.log('API Response:', response);
//     return response;
//   },
//   (error) => {
//     console.error('Response Error:', error);
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 에러 로깅 유틸리티
const logError = (type, error) => {
  const errorInfo = {
    status: error.response?.status,
    statusText: error.response?.statusText,
    url: error.config?.url,
    method: error.config?.method,
    message: error.message
  };

  console.error(`[${type} Error]`, errorInfo);
};

// Request 인터셉터
api.interceptors.request.use(
  (config) => config,
  (error) => {
    logError('Request', error);
    return Promise.reject(error);
  }
);

// Response 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    logError('Response', error);
    return Promise.reject(error);
  }
);

export default api;