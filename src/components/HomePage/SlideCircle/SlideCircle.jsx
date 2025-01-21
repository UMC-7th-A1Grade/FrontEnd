import React from 'react';
import styles from './SlideCircle.module.css';

const SlideCircle = ({ currentPage, onPageChange }) => {
  const circles = [0, 1, 2, 3, 4];

  return (
    <div className={styles.circle_container}>
      {circles.map((index) => (
        <div
          key={index}
          className={`${styles.circle} ${
            currentPage === index ? styles.circle_active : ''
          }`}
          onClick={() => onPageChange(index)}
        />
      ))}
    </div>
  );
};

export default SlideCircle;