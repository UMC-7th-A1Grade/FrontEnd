import React, { useEffect, useState } from 'react';
import styles from '../../styles/randomPage/Timer.module.css';
import clock from '../../assets/images/randomPage/clock.svg';

function Timer({ start }) {
  const [time, setTime] = useState(60 * 60);

  useEffect(() => {
    if (!start) return;

    const countdown = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [start]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTextClass = () => {
    if (!start) return styles.defaultText; // 타이머 시작전
    if (time <= 20 * 60) return styles.warningText; // 20분 이하부터 빨간색
    return styles.activeText; // 타이머 작동중
  };

  const getContainerClass = () => {
    if (time <= 20 * 60) return `${styles.timerContainer} ${styles.warningContainer}`;
    return styles.timerContainer;
  };  

  return (
    <div className={getContainerClass()}>
      <img src={clock} alt="타이머 아이콘" className={styles.timerIcon} />
      <div className={`${styles.timerText} ${getTextClass()}`}>{formatTime(time)}</div>
    </div>
  );
}

export default Timer;
