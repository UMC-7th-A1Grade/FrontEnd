// SmallPopup.jsx
import React from 'react';
import styles from './SmallPopup.module.css';

const SmallPopup = ({ image, onClose, onShowFullPopup }) => {
  const handleContainerClick = (e) => {
    if (!e.target.closest(`.${styles.close}`)) {
      onShowFullPopup();
    }
  };

  return (
    <div className={styles.overlay}>
      <div 
        className={styles.container} 
        onClick={handleContainerClick}
      >
        <p className={styles.guide_text}>
          문제를 터치하시면, 문제와 풀이도 볼 수 있어요!
        </p>
        <button 
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <img 
            src="/src/assets/images/home/X_button.svg" 
            alt="닫기"
          />
        </button>
        <img 
          src={image.url} 
          alt={`슬라이드 이미지 ${image.index + 1}`}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default SmallPopup;