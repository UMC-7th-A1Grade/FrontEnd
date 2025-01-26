import QuestionImage from '../../assets/images/afterShootingPage/image.png';
import styles from '../../styles/afterShootingPage/questionSection.module.css';

export default function SimilarQuestionImage() {
  return (
    <div className={styles.allContainer}>
      <img
        src={QuestionImage}
        className={styles.image}
      />
    </div>
  );
}
