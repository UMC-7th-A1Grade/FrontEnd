import styles from '../../styles/afterShootingPage/noteSection.module.css';
import CustomButton from '../global/CustomButton';
import NoteCard from './NoteCard';

export default function NoteSection({ memo, setMemo, answer, setAnswer, onSave }) {
  const handleSave = () => {
    if (!memo.trim()) {
      alert('메모를 입력해주세요!');
      return;
    }
    onSave(memo, answer);
  };

  return (
    <div className={styles.allContainer}>
      <p className={styles.mainText}>최대한 핵심 키워드나</p>
      <p className={styles.mainText}>한 줄 문장으로 정리해주세요</p>
      <NoteCard
        memo={memo}
        setMemo={setMemo}
        answer={answer}
        setAnswer={setAnswer}
      />
      <div className={styles.buttonContainer}>
        <CustomButton
          size='large'
          color='blue'
          type='filled'
          text='메모 저장하기'
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
