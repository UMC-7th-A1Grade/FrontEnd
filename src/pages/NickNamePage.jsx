import React, { useState } from 'react';
import styles from '../styles/NicknameStyles/NickName.module.css';
import logo from '../assets/images/nickname/Logo_Nickname.png';
import NicknameInput from '../components/NickNamePage/NicknameInput/NicknameInput';
import NextButton from '../components/NickNamePage/NextButton/NextButton';

const NicknamePage = () => {
  const [validNickname, setValidNickname] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleNicknameComplete = (data) => {
    // 엄격한 유효성 검사 추가
    if (data.success && data.nickname && 
        data.nickname.length >= 2 && 
        data.nickname.length <= 5 && 
        /^[가-힣a-zA-Z0-9]+$/.test(data.nickname)) {
      setValidNickname(data.nickname);
      setIsValid(true);
    } else {
      setValidNickname(null);
      setIsValid(false);
    }
  };

  return (
    <div className={styles.background}>
      <main className={styles.container}>
        <section className={styles.contentWrapper}>
          <div className={styles.logoSection}>
            <figure className={styles.logo}>
              <img src={logo} alt="A1등급 로고" />
            </figure>
            <h1 className={styles.welcomeText}>
              <span>A1등급에</span>
              <span>오신 걸 환영합니다.</span>
            </h1>
          </div>
          <div className={styles.inputWrapper}>
            <NicknameInput onComplete={handleNicknameComplete} />
          </div>
          <div className={styles.buttonWrapper}>
            <NextButton 
              isValid={isValid}
              nickname={validNickname}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default NicknamePage;