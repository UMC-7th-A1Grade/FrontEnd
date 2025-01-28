// FullPopup.jsx
import React from 'react';
import styles from './FullPopup.module.css';

const FullPopup = ({ image, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.problem_number}>
          <span>25</span>
        </div>
      </div>
    </div>
  );
};

export default FullPopup;  // default export 추가