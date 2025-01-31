import React from 'react';
import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
import GoogleLogo from '../../assets/images/login/google_logo.svg';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&scope=email profile`;
    window.location.href = googleAuthUrl;
  };

  return (
    <button className={styles.button} onClick={handleGoogleLogin}>
      <div className={styles.content}>
        <img src={GoogleLogo} alt="Google logo" className={styles.logo} />
        <span className={styles.text}>Google로 계속하기</span>
      </div>
    </button>
  );
};

export default GoogleLoginButton;