// import { useNavigate } from 'react-router-dom';
// import styles from './NextButton.module.css';

// const NextButton = ({ onComplete, isValid, nickname }) => {
//   const navigate = useNavigate();

//   // API 엔드포인트 상수 (실제 엔드포인트로 수정 필요)
//   // const API_ENDPOINTS = {
//   //   SAVE_USER: '/api/users/save',
//   // };

//   // 엄격한 유효성 검증 함수
//   const isValidNickname = (nickname) => {
//     if (!nickname || typeof nickname !== 'string') return false;
//     if (nickname.length < 2 || nickname.length > 5) return false;
//     const regex = /^[가-힣a-zA-Z0-9]+$/;
//     if (!regex.test(nickname)) return false;
//     return true;
//   };

//   const handleClick = async () => {
//     // 모든 유효성 검사를 다시 한번 수행
//     if (!isValid || !isValidNickname(nickname)) {
//       return;
//     }

//     try {
//       // API 저장 로직 (실제 API 연동 시 주석 해제)
//       // const result = await saveUserInfo(nickname);
//       // if (result.success) {
//       //   onComplete?.({ success: true, nickname });
//       //   navigate('/next-page');
//       // }

//       // 임시 코드 (API 연동 전까지 사용)
//       if (isValid && isValidNickname(nickname)) {
//         onComplete?.({ 
//           success: true, 
//           nickname,
//         });
//         navigate('/characterselect');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // 버튼 활성화 조건 검사
//   const isButtonEnabled = isValid && isValidNickname(nickname);

//   return (
//     <button
//       className={styles.nextButton}
//       onClick={handleClick}
//       disabled={!isButtonEnabled}
//       type="button"
//     >
//       다음으로
//     </button>
//   );
// };

// export default NextButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './NextButton.module.css';

// 토큰 관리 함수 (로그인 로직에 맞게 수정 필요)
const getAccessToken = () => {
  return localStorage.getItem('accessToken') || '';
};

const NextButton = ({ onComplete, isValid, nickname }) => {
  const navigate = useNavigate();

  // 엄격한 유효성 검증 함수
  const isValidNickname = (nickname) => {
    if (!nickname || typeof nickname !== 'string') return false;
    if (nickname.length < 2 || nickname.length > 5) return false;
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(nickname)) return false;
    return true;
  };

  const handleClick = async () => {
    // 모든 유효성 검사를 다시 한번 수행
    if (!isValid || !isValidNickname(nickname)) {
      return;
    }

    try {
      // 닉네임 저장 API 호출
      const response = await axios.post('/api/users/nickname', 
        { nickname },
        {
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`
          }
        }
      );

      // 백엔드 응답 처리
      if (response.data.isSuccess) {
        onComplete?.({ 
          success: true, 
          nickname 
        });
        navigate('/characterselect');
      } else {
        // 에러 처리 (예: 알림, 에러 메시지 표시)
        console.error('닉네임 저장 실패:', response.data.message);
        alert(response.data.message || '닉네임 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('닉네임 저장 중 오류:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  // 버튼 활성화 조건 검사
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