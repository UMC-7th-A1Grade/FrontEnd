// src/api/mathApi.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

// 백엔드 에러 메시지 분석 함수
const analyzeBackendError = (error) => {
  if (!error.response?.data) return '백엔드 응답 없음';

  const errorData = error.response.data;
  let errorLocation = '';

  if (errorData.code === 'QUESTION4005') {
    errorLocation = `
    위치: QuestionController.java
    메소드: getQuestion()
    원인: 유효하지 않은 문제 ID
    검증 필요:
    1. QuestionService.getQuestion()
    2. QuestionRepository.findById()
    `;
  } else if (errorData.message?.includes('JWT')) {
    errorLocation = `
    위치: JwtProvider.java
    메소드: validateToken() 또는 extractSocialId()
    원인: JWT 토큰 검증 실패
    `;
  }

  return errorLocation || '알 수 없는 위치';
};

// 상세 디버깅 로그 함수
const debugLog = (type, message, data = null) => {
  const styles = {
    api: 'color: #2196F3; font-weight: bold;',
    success: 'color: #4CAF50; font-weight: bold;',
    error: 'color: #f44336; font-weight: bold;',
    warning: 'color: #ff9800; font-weight: bold;',
    info: 'color: #9c27b0; font-weight: bold;',
    backend: 'color: #795548; font-weight: bold;'
  };

  console.group(`%c[${type.toUpperCase()}]`, styles[type.toLowerCase()]);
  console.log(message);
  if (data) {
    console.log('상세 정보:', data);
  }
  console.groupEnd();
};

// 토큰 검증 함수
const validateToken = (token) => {
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('잘못된 JWT 형식');
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    debugLog('info', 'JWT 페이로드 분석', {
      socialId: payload.sub,
      exp: new Date(payload.exp * 1000).toLocaleString(),
      iat: new Date(payload.iat * 1000).toLocaleString()
    });

    return true;
  } catch (error) {
    debugLog('error', 'JWT 토큰 분석 실패', error);
    return false;
  }
};

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      if (!validateToken(token)) {
        debugLog('warning', '유효하지 않은 토큰 형식');
        return Promise.reject(new Error('Invalid token format'));
      }

      config.headers.Authorization = `Bearer ${token}`;
      debugLog('info', 'API 요청 정보', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        timestamp: new Date().toISOString()
      });
    } else {
      debugLog('warning', '토큰이 존재하지 않음', {
        url: config.url,
        method: config.method,
        localStorage: {
          accessToken: localStorage.getItem('accessToken'),
          allKeys: Object.keys(localStorage)
        }
      });
    }
    return config;
  },
  (error) => {
    debugLog('error', '요청 인터셉터 에러', error);
    return Promise.reject(error);
  }
);

// Response Interceptor 
api.interceptors.response.use(
  (response) => {
    if (response.data.isSuccess) {
      debugLog('success', 'API 응답 성공', {
        url: response.config.url,
        data: response.data,
        status: response.status
      });
      return response.data.result;
    }
    return Promise.reject(new Error(response.data.message));
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      debugLog('error', '인증 에러', {
        status: error.response.status,
        message: error.response.data.message
      });
    }
    return Promise.reject(error.response?.data || error);
  }
);

// 문제 관련 API 서비스
export const mathService = {
  // 개별 문제 조회 (문제 이미지, 답, 풀이, 메모)
  getQuestionData: async (userQuestionId) => {
    debugLog('api', '문제 데이터 조회 API 호출 시작');
    
    try {
      debugLog('info', '백엔드 처리 과정', `
      1. JwtAuthenticationFilter.doFilterInternal() 
        - Authorization 헤더에서 토큰 추출
        - 토큰 유효성 검증
      2. JwtProvider.extractSocialId()
        - 토큰에서 socialId 추출
      3. QuestionController.getQuestion()
        - 문제 정보 조회 및 반환
      `);

      const data = await api.get(`/api/question/${userQuestionId}`);
      debugLog('success', '문제 데이터 조회 성공', {
        questionId: userQuestionId,
        data: data
      });

      return {
        questionImg: data.questionImg,
        answer: data.answer,
        memo: data.memo,
        noteUrls: data.note
      };
    } catch (error) {
      const errorLocation = analyzeBackendError(error);
      debugLog('error', '문제 데이터 조회 실패', {
        errorType: error.name,
        errorMessage: error.message,
        errorLocation: errorLocation,
        response: error.response?.data,
        request: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      if (error.code === 'QUESTION4005') {
        throw new Error('유효하지 않은 문제 ID입니다.');
      }
      throw error;
    }
  }
};

export default api;