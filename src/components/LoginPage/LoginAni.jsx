import React from 'react';
import styles from '../../styles/LoginStyles/LogoAni.module.css';

const LogoAni = () => {
  return (
    <figure className={styles.container}>
      <section className={styles.logoWrapper}>
        <svg
          role="img"
          aria-label="Company Logo"
          xmlns="http://www.w3.org/2000/svg"
          width="130"
          height="129"
          viewBox="0 0 130 129"
          className={styles.logo}
        >
          <defs>
            <clipPath id="logo-shape">
              <path d="M65.0005 0.361023L36.0275 58.3117L53.6076 76.8648L65.0005 54.5931L102.95 128.805H129.223L65.0005 0.361023Z" />
              <path d="M28.4857 73.392L0.77771 128.805H27.0504L45.9603 91.8262L28.4857 73.392Z" />
              <path d="M27.0507 128.806C27.0507 128.806 60.1835 114.534 102.95 128.806L94.6706 112.615H35.3299L27.0507 128.806Z" />
            </clipPath>
          </defs>

          <g clipPath="url(#logo-shape)">
            <g className={styles.waveContainer}>
              <rect width="130" height="140" fill="#00D4DC" opacity="0.95" />
              <path
                d="M0,20 Q15,17 30,20 T60,20 T90,20 T120,20 T150,20 V40 H0 Z"
                fill="#00D4DC"
                opacity="0.7"
                className={`${styles.wave} ${styles.wave1}`}
              />
              <path
                d="M0,20 Q15,17 30,20 T60,20 T90,20 T120,20 T150,20 V40 H0 Z"
                fill="#00D4DC"
                opacity="0.5"
                className={`${styles.wave} ${styles.wave2}`}
              />
              <path
                d="M0,20 Q15,17 30,20 T60,20 T90,20 T120,20 T150,20 V40 H0 Z"
                fill="#00D4DC"
                opacity="0.3"
                className={`${styles.wave} ${styles.wave3}`}
              />
            </g>
          </g>
        </svg>
      </section>
      <figcaption className={styles.text}>A1등급</figcaption>
    </figure>
  );
};

export default LogoAni;