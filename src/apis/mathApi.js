import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

// 디버깅 로그 레벨 설정
const DEBUG_LEVEL = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
};

const CURRENT_DEBUG_LEVEL = DEBUG_LEVEL.DEBUG;

// 향상된 디버깅 로그 함수
const debugLog = (level, type, message, data = null) => {
  if (level > CURRENT_DEBUG_LEVEL) return;

  const styles = {
    api: 'color: #2196F3; font-weight: bold;',
    success: 'color: #4CAF50; font-weight: bold;',
    error: 'color: #f44336; font-weight: bold;',
    warning: 'color: #ff9800; font-weight: bold;',
    info: 'color: #9c27b0; font-weight: bold;',
    backend: 'color: #795548; font-weight: bold;',
    debug: 'color: #607D8B; font-weight: bold;'
  };

  console.group(`%c[${type.toUpperCase()}]`, styles[type.toLowerCase()]);
  console.log('⏰ 시간:', new Date().toISOString());
  console.log('📍 메시지:', message);
  
  if (data) {
    console.log('💾 데이터:', data);
    if (data.stack) {
      console.log('🔍 Stack Trace:', data.stack);
    }
  }
  
  console.groupEnd();
};

// 백엔드 에러 분석 함수 개선
const analyzeBackendError = (error) => {
  debugLog(DEBUG_LEVEL.DEBUG, 'debug', 'Analyzing backend error', error);

  if (!error.response?.data) {
    debugLog(DEBUG_LEVEL.ERROR, 'error', 'No backend response');
    return {
      location: '백엔드 응답 없음',
      details: 'Network error or timeout'
    };
  }

  const errorData = error.response.data;
  let errorInfo = {
    location: '',
    details: '',
    stackTrace: error.stack
  };

  switch (errorData.code) {
    case 'QUESTION4003':
      errorInfo.location = 'QuestionService.getQuestion()';
      errorInfo.details = 'UserQuestion 엔티티 조회 실패';
      break;
    case 'QUESTION4004':
      errorInfo.location = 'QuestionService.getQuestion()';
      errorInfo.details = 'Question 엔티티 조회 실패';
      break;
    case 'QUESTION4005':
      errorInfo.location = 'QuestionController.getQuestion()';
      errorInfo.details = 'userQuestionId 파라미터 검증 실패';
      break;
    case 'QUESTION5000':
      errorInfo.location = 'QuestionRepository';
      errorInfo.details = 'Database operation failed';
      break;
    default:
      if (errorData.message?.includes('JWT')) {
        errorInfo.location = 'JwtAuthenticationFilter';
        errorInfo.details = 'JWT 토큰 검증 실패';
      } else {
        errorInfo.location = 'Unknown';
        errorInfo.details = errorData.message || 'Unknown error';
      }
  }

  debugLog(DEBUG_LEVEL.INFO, 'info', 'Error analysis result', errorInfo);
  return errorInfo;
};

// axios 인스턴스 생성
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
      config.headers.Authorization = `Bearer ${token}`;
    }

    debugLog(DEBUG_LEVEL.INFO, 'info', '문제 데이터 조회 시작', {
      userQuestionId: Number(config.url?.split('/').pop()),
      type: 'number'
    });

    debugLog(DEBUG_LEVEL.DEBUG, 'debug', 'API 요청 준비', {
      endpoint: config.url,
      headers: config.headers
    });

    debugLog(DEBUG_LEVEL.INFO, 'info', 'API 요청 시작', {
      endpoint: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      params: config.params
    });

    return config;
  },
  (error) => {
    debugLog(DEBUG_LEVEL.ERROR, 'error', 'Request interceptor error', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    debugLog(DEBUG_LEVEL.INFO, 'info', 'API 응답 성공', {
      endpoint: response.config.url,
      status: response.status,
      data: response.data
    });

    debugLog(DEBUG_LEVEL.INFO, 'info', 'API 응답 수신', {
      status: response.status,
      data: response.data
    });

    return response;
  },
  (error) => {
    debugLog(DEBUG_LEVEL.ERROR, 'error', 'Response interceptor error', error);
    return Promise.reject(error);
  }
);

// 수학 문제 관련 API 서비스
export const mathService = {
  getQuestionData: async (userQuestionId) => {
    if (!userQuestionId || isNaN(Number(userQuestionId))) {
      const error = new Error('유효한 문제 ID가 필요합니다.');
      debugLog(DEBUG_LEVEL.ERROR, 'error', 'Invalid userQuestionId', {
        userQuestionId,
        type: typeof userQuestionId
      });
      throw error;
    }

    try {
      const response = await api.get(`/api/question/${userQuestionId}`);
      
      if (response.data?.isSuccess) {
        return response.data.result;
      }
      
      throw new Error(response.data?.message || '데이터 조회에 실패했습니다.');
    } catch (error) {
      const errorInfo = analyzeBackendError(error);
      debugLog(DEBUG_LEVEL.ERROR, 'error', 'Failed to fetch question data', {
        userQuestionId,
        errorInfo,
        originalError: error
      });

      let errorMessage;
      switch(error.response?.data?.code) {
        case 'QUESTION4003':
          errorMessage = '유저 문제를 찾을 수 없습니다.';
          break;
        case 'QUESTION4004':
          errorMessage = '존재하지 않는 문제입니다.';
          break;
        case 'QUESTION4005':
          errorMessage = '유효하지 않은 문제 ID입니다.';
          break;
        case 'QUESTION5000':
          errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          break;
        default:
          if (error.response?.status === 400) {
            errorMessage = '잘못된 요청입니다.';
          } else if (error.response?.status === 401) {
            errorMessage = '로그인이 필요합니다.';
          } else if (error.response?.status === 404) {
            errorMessage = '문제를 찾을 수 없습니다.';
          } else {
            errorMessage = error.response?.data?.message || '데이터를 불러오는 중 오류가 발생했습니다.';
          }
      }

      const enrichedError = new Error(errorMessage);
      enrichedError.details = errorInfo;
      throw enrichedError;
    }
  }
};

export default api;