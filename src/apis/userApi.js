// userApi.js
import api from './axios';

// 인증 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 사용자 닉네임 조회
export const getUserNickname = async () => {
  try {
    const response = await api.get('/api/users/nickname', {
      headers: {
        ...getAuthHeader()
      }
    });
    
    // API 응답 구조에 맞게 데이터 추출
    return {
      nickname: response.data.result.nickName,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    console.error('닉네임 조회 실패:', error);
    throw error;
  }
};

// 사용자 크레딧 조회
export const getUserCredits = async () => {
  try {
    const response = await api.get('/api/credits', {
      headers: {
        ...getAuthHeader()
      }
    });
    
    // API 응답 구조에 맞게 데이터 추출
    return {
      credits: response.data.result.totalCredit,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    console.error('크레딧 조회 실패:', error);
    throw error;
  }
};