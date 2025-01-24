import { useState } from 'react';
import styles from '../../styles/afterShootingPage/buttonSection.module.css';
import CustomButton from '../global/CustomButton';
import NoteSection from './NoteSection';

export default function ButtonSection() {
  const [showNoteSection, setShowNoteSection] = useState(false);
  const [isNoteSaved, setIsNoteSaved] = useState(false); // 메모 저장 상태 추가

  const handleShowNoteSection = () => {
    setShowNoteSection(true);
  };

  const handleHideNoteSection = () => {
    setShowNoteSection(false);
    setIsNoteSaved(true); // 메모가 저장되었다고 표시
  };

  return (
    <div className={styles.allContainer}>
      {!showNoteSection ? (
        <>
          <CustomButton
            size='big'
            color='darkBlue'
            type='outline'
            text='유사문제 보러가기'
          />
          {isNoteSaved ? (
            <>
              <CustomButton
                size='big'
                color='darkBlue'
                type='filled'
                text='메모 수정하기'
                onClick={handleShowNoteSection}
              />
              <CustomButton
                size='big'
                color='blue'
                type='filled'
                text='저장하기'
              />
            </>
          ) : (
            <CustomButton
              size='big'
              color='gray'
              type='filled'
              text='메모'
              onClick={handleShowNoteSection}
            />
          )}
        </>
      ) : (
        <NoteSection onSave={handleHideNoteSection} /> // 메모 저장 버튼 클릭 시 호출
      )}
    </div>
  );
}
