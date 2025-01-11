import React from 'react';
import styles from '../../styles/NicknameStyles/NextButton.module.css';

const NextButton = () => {
  const handleClick = () => {
    console.log('다음으로 버튼 클릭됨');
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