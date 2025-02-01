import React from 'react';
import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
import GoogleLogo from '../../assets/images/login/google_logo.png';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // 이전 로그인 시도 정보 삭제
    localStorage.removeItem('loginAttempt');
    
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    
    // 새로운 로그인 시도를 위한 URL 생성
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile&prompt=select_account`;
    
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