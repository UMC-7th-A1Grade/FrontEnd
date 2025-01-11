import React from 'react';
import styles from '../../styles/NicknameStyles/NicknameInput.module.css';

const NicknameInput = () => {
  return (
    <div className={styles.inputSection}>
      <input 
        type="text"
        className={styles.nicknameInput}
        placeholder="닉네임을 입력해 주세요"
      />
    </div>
  );
};

export default NicknameInput;