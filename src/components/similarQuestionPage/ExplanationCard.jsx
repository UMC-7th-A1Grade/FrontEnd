import { useContext } from 'react';
import { SimilarContext } from '../../contexts/SimilarContext.jsx'; // 실제 경로에 맞게 수정
import styles from '../../styles/similarQuestionPage/explanationCard.module.css';

export default function ExplanationCard() {
  const { similarData } = useContext(SimilarContext);

  // 🔹 'Step'을 기준으로 줄바꿈 적용하는 함수
  const formatMemo = (memo) => {
    if (!memo.includes("Step")) return memo; // 'Step'이 없으면 그대로 반환

    return memo.replace(/(Step \d+:)/g, "\n\n$1").trim(); 
    // 'Step 숫자:' 앞에 줄바꿈 추가
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <button className={styles.answerButton}>{similarData.answer}</button>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.inputArea}
            value={formatMemo(similarData.memo)}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}
