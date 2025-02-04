import { useContext } from 'react';
import { SimilarContext } from '../../contexts/SimilarContext.jsx'; // 실제 경로에 맞게 수정
import styles from '../../styles/similarQuestionPage/explanationCard.module.css';

export default function ExplanationCard() {
  const { similarData } = useContext(SimilarContext);

  return (
    <div className={styles.allContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <button className={styles.answerButton}>{similarData.answer}</button>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            placeholder='내용을 입력해주세요'
            className={styles.inputArea}
            value={similarData.memo}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}
