import React from 'react';
import styles from './SlideCircle.module.css';

const SlideCircle = ({ currentPage, onPageChange, totalImages }) => {
  if (!totalImages || totalImages === 0) return null;

  // 최대 5개의 원형 인디케이터를 표시할 수 있도록 계산
  const maxCircles = Math.min(totalImages, 5);
  const offset = Math.floor(maxCircles / 2);

  // 가운데를 기준으로 원형 인디케이터 배열 생성
  const circles = Array.from({ length: maxCircles }, (_, i) => {
    const circleIndex = i;
    return (
      <div
        key={circleIndex}
        className={`${styles.circle} ${
          currentPage === circleIndex ? styles.circle_active : ''
        }`}
        onClick={() => onPageChange(circleIndex)}
      />
    );
  });

  return <div className={styles.circle_container}>{circles}</div>;
};

export default SlideCircle;