import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../apis/axios';
import styles from './NextButton.module.css';

const NextButton = ({ onComplete, isValid, nickname }) => {
  const navigate = useNavigate();

  const isValidNickname = (nickname) => {
    // ... 기존 유효성 검사 코드 유지
  };

  const handleClick = async () => {
    if (!isValid || !isValidNickname(nickname)) {
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('인증 토큰이 없습니다.');
      }

      // 요청 전 로깅
      console.log('Sending request with:', {
        nickname,
        token: accessToken,
        url: `${import.meta.env.VITE_SERVER_URL}/api/users`
      });

      const response = await api.post('/api/users', // 전체 URL 대신 상대 경로 사용
        { nickname: nickname }, // 명확한 요청 본문 구조
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response received:', response);

      if (response.data.isSuccess) {
        onComplete?.({
          success: true,
          nickname
        });
        navigate('/characterselect');
      } else {
        alert(response.data.message || '닉네임 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      
      if (error.response?.status === 404) {
        alert('API 엔드포인트를 찾을 수 없습니다. 서버 주소를 확인해주세요.');
      } else {
        alert(error.response?.data?.message || '서버 오류가 발생했습니다.');
      }
    }
  };

  return (
    <button
      className={styles.nextButton}
      onClick={handleClick}
      disabled={!isValid || !isValidNickname(nickname)}
      type="button"
    >
      다음으로
    </button>
  );
};

export default NextButton;