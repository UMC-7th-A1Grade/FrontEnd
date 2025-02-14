import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NextButton.module.css';

const NextButton = ({ isValid, nickname }) => {
  const navigate = useNavigate();

  const isValidNickname = (nickname) => {
    if (!nickname || typeof nickname !== 'string') return false;
    if (nickname.length < 2 || nickname.length > 5) return false;
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(nickname)) return false;
    return true;
  };

  const handleClick = () => {
    if (!isValid || !isValidNickname(nickname)) {
      console.log('Validation failed:', { isValid, nickname });
      return;
    }

    try {
      localStorage.setItem('tempNickname', nickname);
      navigate('/characterselect');
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <button
      className={styles.nextButton}
      onClick={handleClick}
      disabled={!isValid || !isValidNickname(nickname)}
      type="button"
    >
      다음으로
    </button>
  );
};

export default NextButton;