import React from 'react'
import LogoAni from '../components/LoginPage/LoginAni'
import GoogleLoginButton from '../components/LoginPage/LoginButton'
import TestLoginButton from '../components/LoginPage/TestLogin'
import styles from '../styles/LoginStyles/Login.module.css'


const Login = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.logoSection}>
          <LogoAni />
        </section>
        <section className={styles.loginSection}>
          <GoogleLoginButton />
          </section>
          <section className={styles.testloginSection}>
          <TestLoginButton />
          </section>

      </main>
    </div>
  )
}

export default Login