import React from 'react';
import styles from './RandomQuestionButton.module.css';

const RandomQuestionButton = () => {
  return (
    <button className={styles.randomButton}>
      <img
        src="/src/assets/images/icons/random-icon.svg"
        alt="random question"
        className={styles.icon}
      />
    </button>
  );
};

export default RandomQuestionButton;