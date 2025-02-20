import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './SmallPopup.module.css';

const SmallPopup = ({ image, onClose, onShowFullPopup }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleContainerClick = (e) => {
    if (!e.target.closest(`.${styles.closeButton}`)) {
      onShowFullPopup();
    }
  };

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <p className={styles.guideText}>
          문제를 터치하시면, 문제와 풀이도 볼 수 있어요!
        </p>
        
        <div 
          onClick={handleContainerClick}
          className={styles.container}
        >
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <img
              src="/images/home/X_button.png"
              alt="닫기 버튼"
              className={styles.closeIcon}
            />
          </button>

          {isLoading && <div className={styles.skeleton} />}
          <img
            src={image.url}
            alt={`슬라이드 이미지 ${image.index + 1}`}
            className={`${styles.image} ${!isLoading ? styles.loaded : ''}`}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SmallPopup;