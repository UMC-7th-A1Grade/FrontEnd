import { useState } from 'react';
import styles from '../../styles/afterShootingPage/buttonSection.module.css';
import CustomButton from '../global/CustomButton';
import NoteSection from './NoteSection';
import SimilerQuestionModal from './SimilarQuestionModal';
import axios from 'axios';

export default function ButtonSection({ url }) {
  const [showNoteSection, setShowNoteSection] = useState(false);
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [memo, setMemo] = useState('');
  const [answer, setAnswer] = useState('42'); // 정답 값 (예제 데이터)
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleShowNoteSection = () => {
    setShowNoteSection(true);
  };

  const handleHideNoteSection = (savedMemo) => {
    setShowNoteSection(false);
    setIsNoteSaved(true);
    setMemo(savedMemo);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('accessToken');
    const requestBody = {
      memo,
      imageUrl: url,
      type: 'USER',
      answer,
    };

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/question/save`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('저장 오류:', error);
      alert('서버 오류 발생!');
    }
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
            onClick={openModal}
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
                onClick={handleSave}
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
        <NoteSection
          memo={memo}
          setMemo={setMemo}
          onSave={handleHideNoteSection}
        />
      )}

      <SimilerQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={url}
      />
    </div>
  );
}
