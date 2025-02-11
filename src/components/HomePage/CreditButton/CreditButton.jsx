// import React, { useState } from 'react';
// import styles from './CreditButton.module.css';
// import creditIcon from '../../../assets/images/home/credit.png';

// const CreditButton = () => {
//   const [credits, setCredits] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCredits = async () => {
//       try {
//         const response = await fetch('/api/user/credits');
//         const data = await response.json();
//         setCredits(data.credits);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch credits:', error);
//         setCredits(0);
//         setIsLoading(false);
//       }
//     };
//     fetchCredits();
//   }, []);

//   return (
//     <button className={styles.credit_button}>
//       <img 
//         src={creditIcon}
//         alt="credit icon" 
//         className={styles.credit_icon}
//       />
//       <span className={styles.credit_amount}>
//         {credits} 크레딧
//       </span>
//     </button>
//   );
// };

// export default CreditButton;

import React, { useState, useEffect } from 'react';
import styles from './CreditButton.module.css';
import creditIcon from '../../../assets/images/home/credit.png';
import api from '../../../apis/axios';

const CreditButton = () => {
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      // 디버깅: 요청 시작
      console.log('=== 크레딧 요청 디버깅 정보 ===');
      console.log('크레딧 조회 요청 시작');
      
      try {
        // 디버깅: API 요청 정보
        console.log('요청 URL:', `${api.defaults.baseURL}/api/credits`);
        const token = localStorage.getItem('token');
        console.log('인증 토큰 상태:', token ? '존재' : '없음');

        const response = await api.get('/api/credits');
        
        // 디버깅: 응답 정보
        console.log('=== 크레딧 응답 디버깅 정보 ===');
        console.log('응답 상태:', response.status);
        console.log('응답 데이터:', response.data);

        if (response.data && typeof response.data.credits === 'number') {
          setCredits(response.data.credits);
        } else {
          console.error('유효하지 않은 크레딧 데이터:', response.data);
          throw new Error('Invalid credits data structure');
        }
      } catch (error) {
        // 디버깅: 에러 정보
        console.error('=== 크레딧 조회 에러 디버깅 ===');
        if (error.response) {
          console.error('서버 응답 에러:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
        } else if (error.request) {
          console.error('요청 실패 (응답 없음):', error.request);
        } else {
          console.error('요청 설정 중 에러:', error.message);
        }
        
        // 에러 발생 시 기본값 설정
        setCredits(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return (
    <button className={styles.credit_button}>
      <img 
        src={creditIcon}
        alt="credit icon" 
        className={styles.credit_icon}
      />
      <span className={styles.credit_amount}>
        {isLoading ? '로딩중...' : `${credits} 크레딧`}
      </span>
    </button>
  );
};

export default CreditButton;