// RandomButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RandomQuestionButton.module.css';

const RandomButton = () => {
  return (
    <Link to="/random" style={{ textDecoration: 'none' }}>
      <button className={styles.randomButton}>
        <span className={styles.buttonText}>
          틀린 문제 중 랜덤 3문제 보러가기
        </span>
      </button>
    </Link>
  );
};

export default RandomButton;