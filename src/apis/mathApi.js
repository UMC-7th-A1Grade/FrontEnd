import axios from 'axios';
import { createRoot } from 'react-dom/client';
import ErrorModal from './ErrorModal';  // 위에서 만든 ErrorModal 컴포넌트를 사용

const baseURL = import.meta.env.VITE_SERVER_URL;

// 에러 모달을 표시하는 함수
const showErrorModal = (message) => {
  // 모달을 위한 컨테이너 생성
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  
  const root = createRoot(modalContainer);
  
  const closeModal = () => {
    root.unmount();
    document.body.removeChild(modalContainer);
  };
  
  root.render(
    <ErrorModal 
      isOpen={true}
      message={message}
      onClose={closeModal}
    />
  );
};

// 에러 코드에 따른 메시지 매핑
const ERROR_MESSAGES = {
  QUESTION4003: '유저 문제를 찾을 수 없습니다.',
  QUESTION4004: '존재하지 않는 문제입니다.',
  QUESTION4005: '유효하지 않은 문제 ID입니다.',
  QUESTION5000: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

// HTTP 상태 코드에 따른 메시지 매핑
const STATUS_MESSAGES = {
  400: '잘못된 요청입니다.',
  401: '로그인이 필요합니다.',
  404: '문제를 찾을 수 없습니다.',
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
    return config;
  },
  (error) => {
    showErrorModal('요청 처리 중 오류가 발생했습니다.');
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorCode = error.response?.data?.code;
    const statusCode = error.response?.status;
    
    const errorMessage = 
      ERROR_MESSAGES[errorCode] ||
      STATUS_MESSAGES[statusCode] ||
      error.response?.data?.message ||
      '데이터를 불러오는 중 오류가 발생했습니다.';
    
    showErrorModal(errorMessage);
    return Promise.reject(error);
  }
);

// 수학 문제 관련 API 서비스
export const mathService = {
  getQuestionData: async (userQuestionId) => {
    if (!userQuestionId || isNaN(Number(userQuestionId))) {
      showErrorModal('유효한 문제 ID가 필요합니다.');
      throw new Error('유효한 문제 ID가 필요합니다.');
    }
    
    try {
      const response = await api.get(`/api/question/${userQuestionId}`);
      
      if (response.data?.isSuccess) {
        return response.data.result;
      }
      
      throw new Error(response.data?.message || '데이터 조회에 실패했습니다.');
    } catch (error) {
      throw error;
    }
  }
};

export default api;