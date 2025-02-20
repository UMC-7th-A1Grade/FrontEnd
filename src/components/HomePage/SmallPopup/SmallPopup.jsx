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
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={styles.closeIcon}
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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