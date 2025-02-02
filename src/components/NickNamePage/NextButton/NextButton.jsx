import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../apis/axios';  // NicknameInput과 동일한 api 인스턴스 사용
import styles from './NextButton.module.css';

const NextButton = ({ onComplete, isValid, nickname }) => {
  const navigate = useNavigate();

  const isValidNickname = (nickname) => {
    if (!nickname || typeof nickname !== 'string') return false;
    if (nickname.length < 2 || nickname.length > 5) return false;
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(nickname)) return false;
    return true;
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

      const response = await api.post('/api/users',  // PATCH에서 POST로 변경
        { nickname },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (response.data.isSuccess) {
        onComplete?.({
          success: true,
          nickname
        });
        navigate('/characterselect');
      } else {
        console.error('닉네임 저장 실패:', response.data.message);
        alert(response.data.message || '닉네임 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('닉네임 저장 중 오류:', error);
      if (error.response) {
        alert(error.response.data.message || '서버 오류가 발생했습니다.');
      } else if (error.request) {
        alert('서버에 연결할 수 없습니다.');
      } else {
        alert(error.message || '알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const isButtonEnabled = isValid && isValidNickname(nickname);

  return (
    <button
      className={styles.nextButton}
      onClick={handleClick}
      disabled={!isButtonEnabled}
      type="button"
    >
      다음으로
    </button>
  );
};

export default NextButton;