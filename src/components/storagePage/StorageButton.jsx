import { useState, useEffect } from 'react';
import styles from '../../styles/storagePage/storageButton.module.css';

export default function StorageButton({ setFilter }) {
  const [activeButton, setActiveButton] = useState('all');

  useEffect(() => {
    setFilter({ type: null, isOverLimit: false });
  }, [setFilter]);

  const handleButtonClick = (type, isOverLimit, buttonKey) => {
    setFilter({ type, isOverLimit });
    setActiveButton(buttonKey);
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${activeButton === 'all' ? styles.active : ''}`}
          onClick={() => handleButtonClick(null, false, 'all')}
        >
          전체 보기
        </button>
        <button
          className={`${styles.button} ${activeButton === 'user' ? styles.active : ''}`}
          onClick={() => handleButtonClick('USER', false, 'user')}
        >
          내가 틀린 문제 보기
        </button>
        <button
          className={`${styles.button} ${activeButton === 'ai' ? styles.active : ''}`}
          onClick={() => handleButtonClick('AI', false, 'ai')}
        >
          유사 문제 보기
        </button>
        <button
          className={`${styles.button} ${activeButton === 'memory' ? styles.active : ''}`}
          onClick={() => handleButtonClick(null, true, 'memory')}
        >
          기억 저장소
        </button>
      </div>
    </div>
  );
}
