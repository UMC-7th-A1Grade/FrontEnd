import styles from '../../styles/afterShootingPage/buttonSection.module.css';
import CustomButton from '../global/CustomButton';

export default function ButtonSection() {

  return (
    <div className={styles.allContainer}>
      <CustomButton
        size='large'
        color='blue'
        type='filled'
        text='풀이 보러가기'
      />
      <CustomButton
        size='large'
        color='darkBlue'
        type='filled'
        text='저장하기'
      />
    </div>
  );
}
