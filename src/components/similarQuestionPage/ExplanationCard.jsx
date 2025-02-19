import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { SimilarContext } from '../../contexts/SimilarContext.jsx';
import styles from '../../styles/similarQuestionPage/explanationCard.module.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function ExplanationCard() {
  const { similarData } = useContext(SimilarContext);
  const [fontSize, setFontSize] = useState(window.innerWidth >= 768 ? '20px' : '14px');

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth >= 768 ? '20px' : '14px');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatMemo = (memo) => {
    if (!memo.includes('Step')) return [memo];

    const result = memo.split(/(Step \d+: [^]*?(?=Step \d+:|$))/g).filter((part) => part.trim() !== '');

    return result;
  };

  // 한글과 수식을 분리하는 함수
  const separateTextAndMath = (text) => {
    return text.split(/(\$[^$]+\$)/g).map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        // 수식 처리
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(part.slice(1, -1), {
                throwOnError: false,
                displayMode: false, // 인라인 수식
                strict: false,
                trust: true,
                macros: {
                  '\\ ': ' ', // 공백 처리
                  '\\quad': '  ', // 넓은 공백 처리
                },
              }),
            }}
          />
        );
      } else {
        // 한글 및 일반 텍스트 처리
        return (
          <span
            key={index}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {part}
          </span>
        );
      }
    });
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <div className={styles.answerButton}>답 : {similarData.answer}</div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputArea}>
            {formatMemo(similarData.memo).map((part, index) => (
              <div
                key={index}
                style={{ fontSize, marginBottom: '16px', whiteSpace: 'pre-wrap', width: '100%' }}
              >
                {separateTextAndMath(part)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
