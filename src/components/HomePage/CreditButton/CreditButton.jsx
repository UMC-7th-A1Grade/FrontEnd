// import React, { useState, useEffect } from 'react';
// import styles from './CreditButton.module.css';
// import { getUserCredits } from '../../../apis/userApi';

// const CreditButton = () => {
//   const [credits, setCredits] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCredits = async () => {
//       try {
//         const { credits } = await getUserCredits();
//         setCredits(credits);
//       } catch (error) {
//         console.error('크레딧 조회 중 오류 발생:', error);
//         setCredits(0);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCredits();
//   }, []);

//   return (
//     <button className={`${styles.credit_button} layout__creditButton`}>
//       <div className={styles.credit_content}>
//         <img
//           src="/images/home/credit.png"
//           alt="credit icon"
//           className={styles.credit_icon}
//         />
//         <span className={styles.credit_amount}>
//           {isLoading ? '로딩중...' : `${credits} 크레딧`}
//         </span>
//       </div>
//     </button>
//   );
// };

// export default CreditButton;

import React, { useState, useEffect } from 'react';
import styles from './CreditButton.module.css';
import { getUserCredits } from '../../../apis/userApi';

const CreditButton = () => {
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const { credits } = await getUserCredits();
        setCredits(credits);
        setError(null);
      } catch (error) {
        console.error('크레딧 조회 중 오류 발생:', error);
        // 404 에러일 경우 기본값 표시
        if (error.response?.status === 404) {
          setCredits(10); // 기본값으로 10 설정
        } else {
          setError('크레딧 정보를 불러오는데 실패했습니다');
          setCredits(0);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, []);

  // 크레딧 표시 텍스트 결정
  const getCreditDisplay = () => {
    if (isLoading) return '로딩중...';
    if (error) return `${credits} 크레딧`;
    return `${credits} 크레딧`;
  };

  return (
    <button className={`${styles.credit_button} layout__creditButton`}>
      <div className={styles.credit_content}>
        <img
          src="/images/home/credit.png"
          alt="credit icon"
          className={styles.credit_icon}
        />
        <span className={styles.credit_amount}>
          {getCreditDisplay()}
        </span>
      </div>
    </button>
  );
};

export default CreditButton;