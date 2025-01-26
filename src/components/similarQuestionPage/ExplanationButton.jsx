import styles from '../../styles/similarQuestionPage/explanationButton.module.css';
import CustomButton from '../global/CustomButton';
import { useNavigate } from 'react-router-dom';

export default function ExplanationButton() {

  const navigate = useNavigate();

  const clickSave = () => {
    navigate('/storage');
  }

  return (
    <div className={styles.allContainer}>
      <CustomButton
        size='large'
        color='darkBlue'
        type='filled'
        text='저장하기'
        onClick={clickSave}
      />
    </div>
  );
}
