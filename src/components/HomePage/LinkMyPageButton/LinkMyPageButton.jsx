import React from 'react';
import styles from './LinkMyPageButton.module.css';

const LinkMyPageButton = () => {
  return (
    <button className={styles.myPageButton}>
      <img
        src="/src/assets/images/icons/mypage-icon.svg"
        alt="my page"
        className={styles.icon}
      />
    </button>
  );
};

export default LinkMyPageButton;