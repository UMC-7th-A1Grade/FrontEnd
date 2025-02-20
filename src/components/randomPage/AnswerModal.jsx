import React, { useState } from 'react';
import styles from '../../styles/randomPage/AnswerModal.module.css';
import CustomButton from '../../components/global/CustomButton.jsx';
import SolutionModal from './SolutionModal.jsx';

function AnswerModal({ isOpen, isCorrect, onClose, questionId }) {
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  if (!isOpen) return null; // 모달이 열리지 않았다면 렌더링하지 않음

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p className={styles.modalText}>
            {isCorrect ? '축하합니다!' : '아쉽지만, 더욱 발전할 수 있어요!'}
          </p>
          <div className={styles.buttonContainer}>
            <CustomButton size="big" color="gray" type="filled" text="돌아가기" onClick={onClose} />
            <CustomButton size="big" color="blue" type="filled" text="풀이 보러가기" onClick={() => setIsSolutionOpen(true)} />
          </div>
        </div>
      </div>

      <SolutionModal isOpen={isSolutionOpen} onClose={onClose} questionId={questionId} />
    </>
  );
}

export default AnswerModal;
