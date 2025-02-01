import styles from '../../styles/afterShootingPage/buttonSection.module.css';
import CustomButton from '../global/CustomButton';
import { useNavigate } from 'react-router-dom';

export default function ButtonSection() {

  const navigate = useNavigate();

  const goExplanation = () => {
    navigate('/explanation');
  }

  const clickSave = () => {
    navigate('/storage');
  }

  return (
    <div className={styles.allContainer}>
      <CustomButton
        size='large'
        color='blue'
        type='filled'
        text='풀이 보러가기'
        onClick={goExplanation}
      />
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
