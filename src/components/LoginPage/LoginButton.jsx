import React from 'react';
import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
import GoogleLogo from '../../assets/images/Logo_google.svg';

const GoogleLoginButton = () => {
    return (
      <button className={styles.button}>
        <div className={styles.content}>
          <img 
            src={GoogleLogo}
            alt="Google logo"
            className={styles.logo}
          />
          <span className={styles.text}>Google로 계속하기</span>
        </div>
      </button>
    );
  };

export default GoogleLoginButton;