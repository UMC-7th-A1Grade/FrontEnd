// import React from 'react';
// import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css';
// import GoogleLogo from '../../assets/images/login/google_logo.svg';

// const GoogleLoginButton = () => {
//     return (
//       <button className={styles.button}>
//         <div className={styles.content}>
//           <img 
//             src={GoogleLogo}
//             alt="Google logo"
//             className={styles.logo}
//           />
//           <span className={styles.text}>Google로 계속하기</span>
//         </div>
//       </button>
//     );
//   };

// export default GoogleLoginButton;

import React from 'react'
import styles from '../../styles/LoginStyles/GoogleLoginButton.module.css'
import GoogleLogo from '../../assets/images/login/google_logo.svg'

const GoogleLoginButton = () => {
  const CLIENT_ID = '1046170077010-0k3rplff00rnm502sbggpg0c31e8t8dv.apps.googleusercontent.com'
  const REDIRECT_URI = 'http://localhost:3000/auth/google/callback'  // 여기를 3000으로 수정

  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`
    window.location.href = googleAuthUrl
  }

  return (
    <button className={styles.button} onClick={handleGoogleLogin}>
      <div className={styles.content}>
        <img src={GoogleLogo} alt="Google logo" className={styles.logo} />
        <span className={styles.text}>Google로 계속하기</span>
      </div>
    </button>
  )
}

export default GoogleLoginButton
