import styles from '../../styles/afterShootingPage/noteCard.module.css';

export default function NoteSection() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <button className={styles.answerButton}>답</button>
      </div>

      <div className={styles.inputContainer}>
        <textarea
          placeholder='내용을 입력해주세요'
          className={styles.inputArea}
        ></textarea>
      </div>
    </div>
  );
}
