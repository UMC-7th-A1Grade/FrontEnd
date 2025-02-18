import { useContext } from 'react';
import { SimilarContext } from '../../contexts/SimilarContext.jsx';
import styles from '../../styles/similarQuestionPage/explanationCard.module.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function ExplanationCard() {
  const { similarData } = useContext(SimilarContext);

  // 🔹 'Step'별로 문자열을 분리하여 줄바꿈 포함
  const formatMemo = (memo) => {
    if (!memo.includes('Step')) return [memo];

    return memo.split(/(Step \d+: [^]*?(?=Step \d+:|$))/g).filter((part) => part.trim() !== '');
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <button className={styles.answerButton}>{similarData.answer}</button>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputArea}>
            {formatMemo(similarData.memo).map((part, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(part.trim(), {
                    throwOnError: false,
                    displayMode: true, // 블록 수식
                  }),
                }}
                style={{ fontSize: '12px',marginBottom: '16px', whiteSpace: 'pre-line' }} // Step 간 간격 추가
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 