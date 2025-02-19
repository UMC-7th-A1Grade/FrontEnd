// FullPopup.js
import React, { useState, useEffect, useCallback } from 'react';
import styles from './FullPopup.module.css';
import { mathService } from '../../../apis/mathApi';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * 문제 풀이 상세 정보를 보여주는 팝업 컴포넌트
 * @param {string} userQuestionId - 문제 ID
 * @param {function} onClose - 팝업 닫기 핸들러
 */
const FullPopup = ({ userQuestionId, onClose }) => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState('memo');
  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState({
    questionImg: '',
    answer: '',
    memo: '',
    note: []
  });
  const [error, setError] = useState(null);

  // 문제 데이터 로딩
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

  /**
   * 메모를 단계별로 분리하는 함수
   * @param {string} memo - 원본 메모 텍스트
   * @returns {string[]} 분리된 메모 단계들
   */
  const formatMemo = useCallback((memo) => {
    if (!memo || !memo.includes('Step')) return [memo];
    
    return memo.split(/(Step \d+: [^]*?(?=Step \d+:|$))/g)
      .filter(part => part.trim() !== "");
  }, []);

  /**
   * 텍스트와 수식을 분리하여 렌더링하는 함수
   * @param {string} text - 수식이 포함된 텍스트
   */
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

  /**
   * 현재 탭에 따른 컨텐츠 렌더링
   */
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

  // 에러 발생 시 에러 화면 표시
  if (error) {
    return (
      <div className={styles.overlay}>
        <div className={styles.error}>
          {error}
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  }

  return (
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
    </div>
  );
};

export default FullPopup;