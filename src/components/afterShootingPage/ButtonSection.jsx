import { useState } from 'react';
import styles from '../../styles/afterShootingPage/buttonSection.module.css';
import CustomButton from '../global/CustomButton';
import NoteSection from './NoteSection';
import SimilerQuestionModal from './SimilarQuestionModal';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

export default function ButtonSection({ url }) {
  const [showNoteSection, setShowNoteSection] = useState(false);
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [memo, setMemo] = useState('');
  const [answer, setAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // 저장 완료 상태

  const handleShowNoteSection = () => {
    setShowNoteSection(true);
  };

  const handleHideNoteSection = (savedMemo, savedAnswer) => {
    setShowNoteSection(false);
    setIsNoteSaved(true);
    setMemo(savedMemo);
    setAnswer(savedAnswer);
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
      setIsSaved(true); // 저장 성공
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
                text={isSaved ? <FaCheck /> : '메모 수정하기'}
                onClick={isSaved ? () => {} : handleShowNoteSection}
                disabled={isSaved}
              />
              <CustomButton
                size='big'
                color='blue'
                type='filled'
                text={isSaved ? <FaCheck /> : '저장하기'} // 저장된 경우 체크 아이콘으로 변경
                onClick={isSaved ? () => {} : handleSave} // 저장된 경우 클릭 안되게 처리
                disabled={isSaved} // 저장 중이나 저장된 상태에서는 클릭 불가
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
          answer={answer}
          setAnswer={setAnswer}
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
