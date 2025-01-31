import React from 'react';
import styles from '../styles/randomPage/LoadingRandomPage.module.css';
import Logo from "../assets/images/smallLogo.png";

function LoadingRandomPage() {
  return (
    <div className={styles.loadingContainer}>
      <img src={Logo} alt="Logo" className={styles.logo}/>
      <div className={styles.loadingText}>오늘의</div>
      <div className={styles.loadingText}>3문제를 채워주세요!</div>
    </div>
  );
}

export default LoadingRandomPage;
