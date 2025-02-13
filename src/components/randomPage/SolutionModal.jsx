import React from 'react';
import styles from '../../styles/randomPage/SolutionModal.module.css';
import xCircle from '../../assets/images/randomPage/xCircle.png';
import CustomButton from '../../components/global/CustomButton.jsx';

function SolutionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={xCircle} alt="닫기" className={styles.closeButton} onClick={onClose} />
        <div className={styles.solutionWrapper}>
          <p className={styles.solutionText}>답: 오류</p>
        </div>
        <div className={styles.explanationBox}>풀이를 불러오지 못했습니다</div>
      </div>
    </div>
  );
}

export default SolutionModal;
