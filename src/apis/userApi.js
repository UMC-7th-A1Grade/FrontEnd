// // userApi.js
// import api from './axios';

// // 인증 토큰을 헤더에 추가하는 함수
// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // 사용자 닉네임 조회
// export const getUserNickname = async () => {
//   try {
//     const response = await api.get('/api/users/nickname', {
//       headers: {
//         ...getAuthHeader()
//       }
//     });
    
//     // API 응답 구조에 맞게 데이터 추출
//     return {
//       nickname: response.data.result.nickName,
//       isSuccess: response.data.isSuccess
//     };
//   } catch (error) {
//     console.error('닉네임 조회 실패:', error);
//     throw error;
//   }
// };

// // 사용자 크레딧 조회
// export const getUserCredits = async () => {
//   try {
//     const response = await api.get('/api/credits', {
//       headers: {
//         ...getAuthHeader()
//       }
//     });
    
//     // API 응답 구조에 맞게 데이터 추출
//     return {
//       credits: response.data.result.totalCredit,
//       isSuccess: response.data.isSuccess
//     };
//   } catch (error) {
//     console.error('크레딧 조회 실패:', error);
//     throw error;
//   }
// };


// userApi 디버깅 개빡센 버전전
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
  debugLog('info', '인증 토큰 상태 확인', { exists: !!token, token: token ? 'exists' : 'not found' });
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 사용자 닉네임 조회
export const getUserNickname = async () => {
  debugLog('api', '닉네임 조회 시작');
  
  try {
    // 요청 전 상태 확인
    const headers = {
      ...api.defaults.headers,
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
    // 요청 전 상태 확인
    const headers = {
      ...api.defaults.headers,
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