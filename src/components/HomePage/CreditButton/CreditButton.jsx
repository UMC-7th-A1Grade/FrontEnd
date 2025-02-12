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

// CreditButton.jsx
import React, { useState, useEffect } from 'react';
import styles from './CreditButton.module.css';
import creditIcon from '../../../assets/images/home/credit.png';
import { getUserCredits } from '../../../apis/userApi';

const CreditButton = () => {
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const { credits } = await getUserCredits();
        setCredits(credits);
      } catch (error) {
        console.error('크레딧 조회 중 오류 발생:', error);
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