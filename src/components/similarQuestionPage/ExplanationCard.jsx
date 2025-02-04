import { useContext } from 'react';
import { SimilarContext } from '../../contexts/SimilarContext.jsx'; // 실제 경로에 맞게 수정
import styles from '../../styles/similarQuestionPage/explanationCard.module.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function ExplanationCard() {
  const { similarData } = useContext(SimilarContext);

  // 🔹 'Step'을 기준으로 줄바꿈 적용하는 함수
  const formatMemo = (memo) => {
    if (!memo.includes('Step')) return memo; // 'Step'이 없으면 그대로 반환

    return memo.replace(/(Step \d+:)/g, '\n\n$1').trim();
    // 'Step 숫자:' 앞에 줄바꿈 추가
  };

  const renderMathText = (text) => {
    try {
      // KaTeX로 수학 수식 렌더링
      return katex.renderToString(text, { throwOnError: false, displayMode: false });
    } catch (e) {
      return text; // 에러 발생 시 원래 텍스트 반환
    }
  };

  //'Step'을 기준으로 줄바꿈 후 수식 렌더링
  const formatMemoWithMath = (memo) => {
    return formatMemo(memo)
      .split('\n\n')
      .map((part, index) => {
        if (part.includes('$')) {
          // 수식 부분은 katex로 렌더링
          return (
            <div
              key={index}
              style={{ marginBottom: '4px' }}
              dangerouslySetInnerHTML={{
                __html: renderMathText(part),
              }}
            />
          );
        }
        // 수식이 아닌 텍스트는 그냥 출력
        return (
          <div
            key={index}
            style={{ marginBottom: '24px' }}
          >
            {part}
          </div>
        );
      });
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <button className={styles.answerButton}>{similarData.answer}</button>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputArea}>{formatMemoWithMath(similarData.memo)}</div>
        </div>
      </div>
    </div>
  );
}
