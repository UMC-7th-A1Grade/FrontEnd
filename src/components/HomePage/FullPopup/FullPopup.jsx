import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './FullPopup.module.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { mathService } from '../../../apis/mathApi';

const FullPopup = ({ userQuestionId, onClose }) => {
  // 기존 상태 관리 코드 유지
  const [activeTab, setActiveTab] = useState('memo');
  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState({
    questionImg: '',
    answer: '',
    memo: '',
    note: []
  });
  const [error, setError] = useState(null);

  // 기존 useEffect와 유틸리티 함수들 유지
  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        setIsLoading(true);
        const result = await mathService.getQuestionData(userQuestionId);
        setQuestionData(result);
      } catch (error) {
        setError(error.message);
        console.error('Failed to load question data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestionData();
  }, [userQuestionId]);


  
  const formatMemo = useCallback((memo) => {
    if (!memo || !memo.includes('Step')) return [memo];
    return memo.split(/(Step \d+: [^]*?(?=Step \d+:|$))/g)
      .filter(part => part.trim() !== "");
  }, []);

  const separateTextAndMath = useCallback((text) => {
    if (!text) return null;
    return text.split(/(\$[^$]+\$)/g).map((part, index) => {
      if (part.startsWith("$") && part.endsWith("$")) {
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
      return <span key={index} style={{ whiteSpace: "pre-wrap" }}>{part}</span>;
    });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div className={styles.skeleton} />;
    }

    if (activeTab === 'memo') {
      return (
        <div className={styles.memo_container}>
          <img
            src={questionData.questionImg}
            alt="문제 이미지"
            className={styles.problem_image}
          />
          <div className={styles.memo_text}>
            {formatMemo(questionData.memo).map((part, index) => (
              <div key={index} className={styles.memo_step}>
                {separateTextAndMath(part)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (!questionData.note?.length) {
      return <div className={styles.no_note}>필기가 없습니다</div>;
    }

    return (
      <img
        src={questionData.note[0]}
        alt="필기 이미지"
        className={styles.problem_image}
      />
    );
  };

  // 에러 UI를 Portal로 감싸기
  // if (error) {
  //   return createPortal(
  //     <div className={styles.overlay}>
  //       <div className={styles.error}>
  //         {error}
  //         <button onClick={onClose}>닫기</button>
  //       </div>
  //     </div>,
  //     document.body
  //   );
  // }

  if (error) {
    mathService.showErrorPopup(error, onClose);
    return null;
  }

  // 메인 UI를 Portal로 감싸기
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.answer_container}>
            <span>{`답: ${questionData.answer || '...'}`}</span>
          </div>

          <button className={styles.close_button} onClick={onClose}>
            <img src="/images/home/X_button.png" alt="닫기" />
          </button>

          <div className={styles.toggle_buttons}>
            <button
              className={`${styles.toggle_button} ${activeTab === 'memo' ? styles.active : ''}`}
              onClick={() => setActiveTab('memo')}
            >
              메모
            </button>
            <button
              className={`${styles.toggle_button} ${activeTab === 'note' ? styles.active : ''}`}
              onClick={() => setActiveTab('note')}
            >
              필기
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.image_container}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FullPopup;
