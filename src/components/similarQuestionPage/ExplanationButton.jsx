import styles from '../../styles/similarQuestionPage/explanationButton.module.css';
import CustomButton from '../global/CustomButton';

export default function ExplanationButton() {

  return (
    <div className={styles.allContainer}>
      <CustomButton
        size='large'
        color='darkBlue'
        type='filled'
        text='저장하기'
      />
    </div>
  );
}
