import React from 'react';
import styles from '../../styles/randomPage/RandomProblem.module.css';

function RandomProblem({ problemNo, isActive, onClick }) {
  return (
    <div
      className={styles.problemContainer}
      onClick={onClick}
    >
      <div className={`${styles.problemNo} ${isActive ? styles.active : ''}`}>{problemNo}</div>
    </div>
  );
}

export default RandomProblem;
