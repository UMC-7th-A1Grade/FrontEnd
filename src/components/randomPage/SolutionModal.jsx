import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import styles from '../../styles/randomPage/SolutionModal.module.css';
import xCircle from '../../assets/images/randomPage/xCircle.png';

function SolutionModal({ isOpen, onClose, questionId }) {
  const [solutionText, setSolutionText] = useState('답: 오류');
  const [explanation, setExplanation] = useState('풀이를 불러오지 못했습니다');
  const token = localStorage.getItem('accessToken');

  // LaTeX 문법($...$)을 분리하여 렌더링하는 함수
  const separateTextAndMath = useCallback((text) => {
    if (!text) return null;
    return text.split(/(\$[^$]+\$)/g).map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(part.slice(1, -1), {
                throwOnError: false,
                displayMode: false,
                strict: false,
                trust: true,
                macros: {
                  "\\ ": " ",
                  "\\quad": "  ",
                },
              }),
            }}
          />
        );
      }
      return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
    });
  }, []);

  // explanation이 "Step"을 포함하면 정규식을 이용해 분리함
  const formatMemo = useCallback((memo) => {
    if (!memo || !memo.includes('Step')) return [memo];
    return memo
      .split(/(Step \d+: [^]*?(?=Step \d+:|$))/g)
      .filter((part) => part.trim() !== '');
  }, []);

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
        
        <div className={styles.header}>
          <div className={styles.solutionWrapper}>
            <p className={styles.solutionText}>
              {separateTextAndMath(solutionText)}
            </p>
          </div>
        </div>
        
        <div className={styles.explanationBox}>
          {formatMemo(explanation).map((part, index) => (
            <div key={index}>
              {separateTextAndMath(part)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SolutionModal;
