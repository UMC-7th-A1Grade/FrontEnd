import React from 'react';
import styles from './SemicircleMessage.module.css';

const SemicircleMessage = () => {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.semicircle}>
        <p className={styles.messageText}>
          오늘의 복습 문제를 풀어보세요!
        </p>
      </div>
    </div>
  );
};

export default SemicircleMessage;