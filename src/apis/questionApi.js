import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      params: config.params,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export const getRecentQuestions = async () => {
  try {
    const response = await api.get('/api/question/recent');
    return response.data.result.questions;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      if (code === 'QUESTION4004' || code === 'QUESTION4005') {
        console.error(message);
        return [];
      }
    }
    console.error('Recent questions fetch error:', error);
    return [];
  }
};