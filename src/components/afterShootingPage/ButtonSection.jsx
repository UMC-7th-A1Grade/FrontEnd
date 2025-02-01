import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/afterShootingPage/buttonSection.module.css';
import CustomButton from '../global/CustomButton';
import NoteSection from './NoteSection';
import SimilerQuestionModal from './SimilarQuestionModal';

export default function ButtonSection() {
  const [showNoteSection, setShowNoteSection] = useState(false);
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleShowNoteSection = () => {
    setShowNoteSection(true);
  };

  const handleHideNoteSection = () => {
    setShowNoteSection(false);
    setIsNoteSaved(true); // 메모가 저장되었다고 표시
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // "유사문제 보러가기" 버튼 클릭 시 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const goSimilerQuestion = () => {
    setIsModalOpen(false);
    navigate('/similarQuestion');
  }

  const goStorage = () => {
    navigate('/storage');
  }

  return (
    <div className={styles.allContainer}>
      {!showNoteSection ? (
        <>
          <CustomButton
            size='big'
            color='darkBlue'
            type='outline'
            text='유사문제 보러가기'
            onClick={handleOpenModal}
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
                onClick={goStorage}
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

      <SimilerQuestionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className={styles.textContainer}>
          <h2>1 크레딧이 소모됩니다.</h2>
          <p>괜찮으신가요?</p>
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton
            size='middle'
            color='gray'
            type='filled'
            text='아니오'
            onClick={handleCloseModal}
          />
          <CustomButton
            size='middle'
            color='blue'
            type='filled'
            text='네'
            onClick={goSimilerQuestion}
          />
        </div>
      </SimilerQuestionModal>
    </div>
  );
}
