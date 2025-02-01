// CreditButton.jsx
import React, { useState } from 'react';
import styles from './CreditButton.module.css';

const CreditButton = () => {
  // API 연동 시 사용할 상태 관리
  // const [credits, setCredits] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  // API 연동 시 사용할 useEffect
  // useEffect(() => {
  //   const fetchCredits = async () => {
  //     try {
  //       const response = await fetch('/api/user/credits');
  //       const data = await response.json();
  //       setCredits(data.credits);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error('Failed to fetch credits:', error);
  //       setCredits(0);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchCredits();
  // }, []);

  // 임시 더미 데이터
  const [credits] = useState(1);

  return (
    <button className={styles.credit_button}>
      <img src="\src\assets\images\home\credit.png" 
        alt="credit icon" className={styles.credit_icon}/>
            <span className={styles.credit_amount}>{credits}
            크레딧</span>
    </button>
  );
};

export default CreditButton;