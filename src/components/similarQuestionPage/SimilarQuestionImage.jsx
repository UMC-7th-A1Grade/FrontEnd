import { useContext } from 'react';
import styles from '../../styles/similarQuestionPage/SimilarQuestionImage.module.css';
import QuestionImage from '../../assets/images/afterShootingPage/image.png';
import { SimilarContext } from '../../contexts/similarContext.jsx';

export default function SimilarQuestionImage() {
  const { similarData } = useContext(SimilarContext);

  return (
    <div className={styles.allContainer}>
      <img
        src={similarData.image || QuestionImage}
        alt='Generated Question'
        className={styles.image}
      />
    </div>
  );
}
