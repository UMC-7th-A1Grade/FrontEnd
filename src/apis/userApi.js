
import api from './axios';

// 에러 메시지 매핑
const ERROR_MESSAGES = {
  TOKEN_NOT_FOUND: '토큰이 존재하지 않습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  CREDIT_NOT_FOUND: '크레딧 정보를 찾을 수 없습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.'
};

// 토큰 검증 함수
const validateToken = (token) => {
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }
    JSON.parse(atob(tokenParts[1]));
    return true;
  } catch (error) {
    return false;
  }
};

// axios 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error(ERROR_MESSAGES.TOKEN_NOT_FOUND);
    }
    
    if (!validateToken(token)) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 사용자 닉네임 조회
export const getUserNickname = async () => {
  try {
    const response = await api.get('/api/users/nickname');
    return {
      nickname: response.data.result.nickName,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      ERROR_MESSAGES.UNKNOWN_ERROR;
    
    throw new Error(errorMessage);
  }
};

// 사용자 크레딧 조회
export const getUserCredits = async () => {
  try {
    const response = await api.get('/api/users/credit');
    return {
      credits: response.data.result.credit,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    // 에러 발생 시 기본값 반환
    return {
      credits: 0,
      isSuccess: false
    };
  }
};