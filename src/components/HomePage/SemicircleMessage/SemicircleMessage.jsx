import React from 'react';
import styles from './SemicircleMessage.module.css';

const SemicircleMessage = () => {
  return (
      <div className={styles.semicircle}>
        <p className={styles.messageText}>
        AI의 Ai가 당신의 오답을 기록해놨어요       
        </p>
      </div>
  );
};

export default SemicircleMessage;