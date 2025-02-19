import { useContext } from 'react';
import styles from '../../styles/similarQuestionPage/similarQuestionImage.module.css';
import { SimilarContext } from '../../contexts/SimilarContext.jsx';

export default function SimilarQuestionImage() {
  const { similarData } = useContext(SimilarContext);

  return (
    <div className={styles.allContainer}>
      <img
        src={similarData.image}
        alt='Generated Question'
        className={styles.image}
      />
    </div>
  );
}
