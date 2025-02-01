import React from 'react';
import styles from '../../styles/randomPage/Timer.module.css';
import clock from '../../assets/images/randomPage/clock.svg';
import { useTimer } from '../../components/randomPage/TimerContext';

function Timer() {
  const { time, start } = useTimer();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTextClass = () => {
    if (!start) return styles.defaultText; // 타이머 시작 전
    if (time <= 20 * 60) return styles.warningText; // 20분 이하 경고 색상
    return styles.activeText; // 기본 타이머 작동 중
  };

  const getContainerClass = () => {
    return time <= 20 * 60 ? `${styles.timerContainer} ${styles.warningContainer}` : styles.timerContainer;
  };

  return (
    <div className={getContainerClass()}>
      <img src={clock} alt="타이머 아이콘" className={styles.timerIcon} />
      <div className={`${styles.timerText} ${getTextClass()}`}>{formatTime(time)}</div>
    </div>
  );
}

export default Timer;
