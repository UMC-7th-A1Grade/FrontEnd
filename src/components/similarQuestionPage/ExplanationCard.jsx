import styles from '../../styles/similarQuestionPage/explanationCard.module.css';

export default function ExplanationCard() {
  return (
    <div className={styles.allContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <button className={styles.answerButton}>25</button>
        </div>

        <div className={styles.inputContainer}>
          <textarea
            placeholder='내용을 입력해주세요'
            className={styles.inputArea}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
