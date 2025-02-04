import styles from '../../styles/afterShootingPage/noteCard.module.css';

export default function NoteCard({ memo, setMemo }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <button className={styles.answerButton}>답</button>
      </div>

      <div className={styles.inputContainer}>
        <textarea
          placeholder='내용을 입력해주세요'
          className={styles.inputArea}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
