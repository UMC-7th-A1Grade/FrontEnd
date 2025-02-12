// userApiDebug.js
import api from './axios';

// 디버깅을 위한 유틸리티 함수
const debugLog = (type, message, data = null) => {
  const styles = {
    api: 'color: #2196F3; font-weight: bold;',
    success: 'color: #4CAF50; font-weight: bold;',
    error: 'color: #f44336; font-weight: bold;',
    warning: 'color: #ff9800; font-weight: bold;',
    info: 'color: #9c27b0; font-weight: bold;'
  };

  console.log(`%c[${type.toUpperCase()}]`, styles[type.toLowerCase()], message);
  if (data) {
    console.log(
      '%c[DATA]',
      'color: #795548; font-weight: bold;',
      JSON.stringify(data, null, 2)
    );
  }
};

// 인증 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    debugLog('warning', '토큰이 존재하지 않음');
    return {};
  }

  debugLog('info', '토큰 정보', {
    tokenExists: true,
    tokenPreview: `${token.substring(0, 15)}...`
  });

  return { Authorization: `Bearer ${token}` };
};

// 사용자 닉네임 조회
export const getUserNickname = async () => {
  debugLog('api', '닉네임 조회 시작');
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    };
    
    debugLog('info', 'API 요청 정보', {
      baseURL: api.defaults.baseURL,
      endpoint: '/api/users/nickname',
      headers
    });

    const response = await api.get('/api/users/nickname', { headers });
    
    debugLog('success', '닉네임 조회 성공', response.data);

    // 응답 데이터 구조 검증
    if (!response.data.result?.nickName) {
      debugLog('warning', '응답에 닉네임 필드가 없거나 잘못된 형식', response.data);
    }
    
    return {
      nickname: response.data.result.nickName,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    debugLog('error', '닉네임 조회 실패', {
      name: error.name,
      message: error.message,
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      }
    });
    throw error;
  }
};

// 사용자 크레딧 조회
export const getUserCredits = async () => {
  debugLog('api', '크레딧 조회 시작');
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    };
    
    debugLog('info', 'API 요청 정보', {
      baseURL: api.defaults.baseURL,
      endpoint: '/api/credits',
      headers
    });

    const response = await api.get('/api/credits', { headers });
    
    debugLog('success', '크레딧 조회 성공', response.data);

    // 응답 데이터 구조 검증
    if (typeof response.data.result?.totalCredit !== 'number') {
      debugLog('warning', '응답의 크레딧 값이 숫자가 아니거나 잘못된 형식', response.data);
    }
    
    return {
      credits: response.data.result.totalCredit,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    debugLog('error', '크레딧 조회 실패', {
      name: error.name,
      message: error.message,
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      }
    });
    throw error;
  }
};

// API 응답 성공 여부 확인
export const isApiSuccess = (response) => {
  return response?.data?.isSuccess === true;
};

// API 에러 메시지 추출
export const getErrorMessage = (error) => {
  return error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
};