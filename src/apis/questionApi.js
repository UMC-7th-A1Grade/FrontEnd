import axios from 'axios';

/**
 * axios 인스턴스 생성
 * baseURL: 환경 변수에서 서버 URL 가져옴
 * withCredentials: CORS 요청 시 쿠키 포함
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 요청 인터셉터
 * 모든 API 요청 전에 실행되며, 주로 인증 토큰을 헤더에 추가하는 역할
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터
 * 모든 API 응답을 처리하며, 에러 발생 시 상세 정보를 포함하여 에러 전파
 */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 객체에 요청 정보와 응답 정보를 포함하여 전파
    if (error.response) {
      error.details = {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      };
    }
    return Promise.reject(error);
  }
);

/**
 * 최근 문제 목록을 조회하는 함수
 * @returns {Promise<Array>} 최근 문제 목록, 에러 발생 시 빈 배열 반환
 */

export const getRecentQuestions = async () => {
  try {
    const response = await api.get('/api/question/recent');
    return response.data.result.questions || [];
  } catch (error) {
    // 에러 발생 시 빈 배열 반환하여 UI 오류 방지
    return [];
  }
};

export default api;