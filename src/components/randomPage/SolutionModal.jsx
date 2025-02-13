import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/randomPage/SolutionModal.module.css';
import xCircle from '../../assets/images/randomPage/xCircle.png';
import CustomButton from '../../components/global/CustomButton.jsx';

function SolutionModal({ isOpen, onClose, questionId }) {
  const [solutionText, setSolutionText] = useState('답: 오류');
  const [explanation, setExplanation] = useState('풀이를 불러오지 못했습니다');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!isOpen || !questionId) return;

    const fetchSolution = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/question/answer/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (res.data?.isSuccess) {
          setSolutionText(`답: ${res.data.result.answer}`);
          setExplanation(res.data.result.memo);
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchSolution();
  }, [isOpen, questionId, token]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={xCircle} alt="닫기" className={styles.closeButton} onClick={onClose} />
        <div className={styles.solutionWrapper}>
          <p className={styles.solutionText}>{solutionText}</p>
        </div>
        <div className={styles.explanationBox}>{explanation}</div>
      </div>
    </div>
  );
}

export default SolutionModal;
