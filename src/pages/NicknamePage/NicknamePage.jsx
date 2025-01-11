import React from 'react';
import styles from '../../styles/NicknameStyles/Nickname.module.css';
import logo from '../../assets/images/Logo_register.svg';
import NicknameInput from '../../components/NicknamePage/NicknameInput'; 
import NextButton from '../../components/NicknamePage/NextButton';

const NicknamePage = () => {
  return (
    <main className={styles.container}>
      <section className={styles.contentWrapper}>
        <header className={styles.logoSection}>
          <figure className={styles.logo}>
            <img src={logo} alt="A1등급 로고" />
          </figure>
          <h1 className={styles.welcomeText}>
            <span>A1등급에</span>
            <br />
            <span>오신 걸 환영합니다.</span>
          </h1>
        </header>
        <NicknameInput />  
        <NextButton />
      </section>
    </main>
  );
};

export default NicknamePage;