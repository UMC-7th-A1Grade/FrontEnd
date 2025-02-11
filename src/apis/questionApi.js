// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
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

// export const getRecentQuestions = async () => {
//   try {
//     const response = await api.get('/api/question/recent');
//     return response.data.result.questions;
//   } catch (error) {
//     if (error.response) {
//       const { code, message } = error.response.data;
//       if (code === 'QUESTION4004' || code === 'QUESTION4005') {
//         console.error(message);
//         return [];
//       }
//     }
//     console.error('Recent questions fetch error:', error);
//     return [];
//   }
// };

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    
    // 요청 디버깅
    console.log('=== 요청 디버깅 정보 ===');
    console.log('토큰 상태:', accessToken ? '존재' : '없음');
    if (!accessToken) {
      console.warn('로컬 스토리지에 토큰이 없습니다.');
    }
    console.log('기본 URL:', config.baseURL);
    console.log('요청 경로:', config.url);
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      console.log('전체 헤더 정보:', config.headers);
    }

    return config;
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log('=== 응답 디버깅 정보 ===');
    console.log('상태 코드:', response.status);
    console.log('응답 데이터:', response.data);
    return response;
  },
  (error) => {
    console.error('=== 에러 디버깅 정보 ===');
    console.error('요청 설정:', {
      '기본 URL': error.config?.baseURL,
      '요청 경로': error.config?.url,
      '요청 방식': error.config?.method,
      '요청 헤더': error.config?.headers
    });
    
    if (error.response) {
      console.error('에러 응답:', {
        '상태 코드': error.response.status,
        '에러 데이터': error.response.data,
        '응답 헤더': error.response.headers
      });
    }

    return Promise.reject(error);
  }
);

export const getRecentQuestions = async () => {
  console.log('=== 최근 문제 조회 디버깅 ===');
  try {
    // 로컬 스토리지 상태 확인
    console.log('로컬 스토리지 상태:', {
      '액세스 토큰': localStorage.getItem('accessToken') ? '존재' : '없음',
      '사용자 이메일': localStorage.getItem('userEmail') || '없음',
      '소셜 ID': localStorage.getItem('socialId') || '없음',
      '사용자 닉네임': localStorage.getItem('userNickname') || '없음'
    });

    const response = await api.get('/api/question/recent');
    return response.data.result.questions || [];
  } catch (error) {
    console.error('최근 문제 조회 에러:', {
      '에러 메시지': error.message,
      '상태 코드': error.response?.status,
      '에러 데이터': error.response?.data
    });
    return [];
  }
};

export default api;