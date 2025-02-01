// // // import React from 'react';
// // // import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
// // // import GoogleLogo from '../../assets/images/login/google_logo.svg';

// // // const GoogleLoginButton = () => {
// // //   const handleGoogleLogin = () => {
// // //     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&scope=email profile`;
// // //     window.location.href = googleAuthUrl;
// // //   };

// // //   return (
// // //     <button className={styles.button} onClick={handleGoogleLogin}>
// // //       <div className={styles.content}>
// // //         <img src={GoogleLogo} alt="Google logo" className={styles.logo} />
// // //         <span className={styles.text}>Google로 계속하기</span>
// // //       </div>
// // //     </button>
// // //   );
// // // };

// // // export default GoogleLoginButton;

// // import React from 'react';
// // import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
// // import GoogleLogo from '../../assets/images/login/google_logo.svg';

// // const GoogleLoginButton = () => {
// //   const handleGoogleLogin = () => {
// //     const width = 500;
// //     const height = 600;
// //     const left = window.screenX + (window.outerWidth - width) / 2;
// //     const top = window.screenY + (window.outerHeight - height) / 2.5;

// //     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
// //       import.meta.env.VITE_GOOGLE_CLIENT_ID
// //     }&redirect_uri=${
// //       import.meta.env.VITE_REDIRECT_URI
// //     }&response_type=code&scope=email profile`;

// //     window.open(
// //       googleAuthUrl,
// //       'GoogleLogin',
// //       `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
// //     );

// //     // 팝업 창에서 메시지 수신을 위한 이벤트 리스너
// //     window.addEventListener('message', (event) => {
// //       if (event.origin !== window.location.origin) return;
// //       if (event.data.type === 'googleLoginSuccess') {
// //         window.location.href = '/nickname';
// //       }
// //     });
// //   };

// //   return (
// //     <button className={styles.button} onClick={handleGoogleLogin}>
// //       <div className={styles.content}>
// //         <img src={GoogleLogo} alt="Google logo" className={styles.logo} />
// //         <span className={styles.text}>Google로 계속하기</span>
// //       </div>
// //     </button>
// //   );
// // };

// // export default GoogleLoginButton;

// import React from 'react';
// import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
// import GoogleLogo from '../../assets/images/login/google_logo.svg';

// const GoogleLoginButton = () => {
//   const handleGoogleLogin = () => {
//     const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//     const redirectUri = import.meta.env.VITE_REDIRECT_URI;

//     // 필요한 모든 스코프 추가
//     const scope = encodeURIComponent([
//       'email',
//       'profile',
//       'openid',
//       'https://www.googleapis.com/auth/userinfo.email',
//       'https://www.googleapis.com/auth/userinfo.profile'
//     ].join(' '));

//     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
//       `client_id=${clientId}` +
//       `&redirect_uri=${encodeURIComponent(redirectUri)}` +
//       `&response_type=code` +
//       `&scope=${scope}` +
//       `&access_type=offline` +
//       `&prompt=consent`;

//     console.log('Auth URL:', googleAuthUrl);
    
//     window.location.href = googleAuthUrl;
//   };

//   return (
//     <button className={styles.button} onClick={handleGoogleLogin}>
//       <div className={styles.content}>
//         <img src={GoogleLogo} alt="Google logo" className={styles.logo} />
//         <span className={styles.text}>Google로 계속하기</span>
//       </div>
//     </button>
//   );
// };

// export default GoogleLoginButton;

import React from 'react';
import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
import GoogleLogo from '../../assets/images/login/google_logo.svg';

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