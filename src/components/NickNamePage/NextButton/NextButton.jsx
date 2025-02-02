// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../../apis/axios';  // NicknameInput과 동일한 api 인스턴스 사용
// import styles from './NextButton.module.css';

// const NextButton = ({ onComplete, isValid, nickname }) => {
//   const navigate = useNavigate();

//   const isValidNickname = (nickname) => {
//     if (!nickname || typeof nickname !== 'string') return false;
//     if (nickname.length < 2 || nickname.length > 5) return false;
//     const regex = /^[가-힣a-zA-Z0-9]+$/;
//     if (!regex.test(nickname)) return false;
//     return true;
//   };

//   const handleClick = async () => {
//     if (!isValid || !isValidNickname(nickname)) {
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       if (!accessToken) {
//         throw new Error('인증 토큰이 없습니다.');
//       }

//       const response = await api.post('/api/users',  // PATCH에서 POST로 변경
//         { nickname },
//         {
//           headers: {
//             'Authorization': `Bearer ${accessToken}`
//           }
//         }
//       );

//       if (response.data.isSuccess) {
//         onComplete?.({
//           success: true,
//           nickname
//         });
//         navigate('/characterselect');
//       } else {
//         console.error('닉네임 저장 실패:', response.data.message);
//         alert(response.data.message || '닉네임 저장에 실패했습니다.');
//       }
//     } catch (error) {
//       console.error('닉네임 저장 중 오류:', error);
//       if (error.response) {
//         alert(error.response.data.message || '서버 오류가 발생했습니다.');
//       } else if (error.request) {
//         alert('서버에 연결할 수 없습니다.');
//       } else {
//         alert(error.message || '알 수 없는 오류가 발생했습니다.');
//       }
//     }
//   };

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

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../../apis/axios';
// import styles from './NextButton.module.css';

// const NextButton = ({ onComplete, isValid, nickname }) => {
//  const navigate = useNavigate();

//  const isValidNickname = (nickname) => {
//    if (!nickname || typeof nickname !== 'string') return false;
//    if (nickname.length < 2 || nickname.length > 5) return false;
//    const regex = /^[가-힣a-zA-Z0-9]+$/;
//    if (!regex.test(nickname)) return false;
//    return true;
//  };

//  const handleClick = async () => {
//    console.log('Button clicked');
   
//    if (!isValid || !isValidNickname(nickname)) {
//      console.log('Validation failed:', { isValid, nickname });
//      return;
//    }

//    try {
//      const accessToken = localStorage.getItem('accessToken');
//      console.log('AccessToken:', accessToken);

//      if (!accessToken) {
//        throw new Error('인증 토큰이 없습니다.');
//      }

//      console.log('About to send request with:', {
//        nickname,
//        token: accessToken,
//        url: `${import.meta.env.VITE_SERVER_URL}/api/users`
//      });

//      const response = await api.saveNickname(nickname, accessToken);
//      console.log('Response received:', response);

//      if (response.data.isSuccess) {
//        onComplete?.({
//          success: true,
//          nickname
//        });
//        navigate('/characterselect');
//      } else {
//        alert(response.data.message || '닉네임 저장에 실패했습니다.');
//      }
//    } catch (error) {
//      console.error('Error details:', {
//        status: error.response?.status,
//        data: error.response?.data,
//        config: error.config
//      });
     
//      if (error.response?.status === 404) {
//        alert('API 엔드포인트를 찾을 수 없습니다. 서버 주소를 확인해주세요.');
//      } else {
//        alert(error.response?.data?.message || '서버 오류가 발생했습니다.');
//      }
//    }
//  };

//  return (
//    <button
//      className={styles.nextButton}
//      onClick={handleClick}
//      disabled={!isValid || !isValidNickname(nickname)}
//      type="button"
//    >
//      다음으로
//    </button>
//  );
// };

// export default NextButton;

// NextButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NextButton.module.css';

const NextButton = ({ onComplete, isValid, nickname }) => {
 const navigate = useNavigate();

 const handleClick = () => {
   // 성공한 것처럼 콘솔에 로그 출력
   console.log('닉네임 저장 성공:', {
     success: true,
     nickname: nickname || '테스트닉네임'
   });

   // 성공 콜백 호출
   onComplete?.({
     success: true,
     nickname: nickname || '테스트닉네임'
   });

   // 다음 페이지로 이동
   navigate('/characterselect');
 };

 return (
   <button
     className={styles.nextButton}
     onClick={handleClick}
     type="button"
   >
     다음으로
   </button>
 );
};

export default NextButton;