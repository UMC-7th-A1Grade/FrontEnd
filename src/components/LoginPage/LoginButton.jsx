import React from 'react';
import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
import GoogleLogo from '../../assets/images/login/google_logo.png';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // 환경변수 확인을 위한 디버깅
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    
    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);
    
    // clientId나 redirectUri가 없는 경우 처리
    if (!clientId || !redirectUri) {
      console.error('Missing required OAuth parameters:',
        !clientId ? 'Client ID is missing' : 'Redirect URI is missing');
      return;
    }

    // URL 파라미터 객체 생성
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email profile',
      prompt: 'select_account'
    });

    // 최종 URL 생성
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
    // 최종 URL 확인
    console.log('Final Auth URL:', googleAuthUrl);

    localStorage.removeItem('loginAttempt');
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