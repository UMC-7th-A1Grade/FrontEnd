import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/afterShootingPage/similarQuestionModal.module.css';
import CustomButton from '../global/CustomButton';
import axios from 'axios';
import SimilarLoding from '../common/SimilarLoding';
import { generateImageFromText } from '../similarQuestionPage/GenerateImage';
import { SimilarContext } from '../../contexts/SimilarContext.jsx';

const SimilerQuestionModal = ({ isOpen, onClose, imageUrl }) => {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateSimilar } = useContext(SimilarContext);

  if (!isOpen) return null;
  if (loading) return <SimilarLoding />;

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!imageUrl) {
      alert('이미지가 없습니다.');
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      const params = new URLSearchParams({ imageUrl });
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/open-ai/generate?${params}`);

      if (response.data.isSuccess === true) {
        // POST API가 성공하면 PATCH API 실행
        await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/api/users/credit`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const questionText = response.data.result.question;
        const memo = response.data.result.memo;
        const answer = response.data.result.answer;

        // question 텍스트를 이미지로 변환
        const generatedImage = await generateImageFromText(questionText);

        // memo와 answer을 Context에 저장
        updateSimilar(memo, answer, generatedImage);

        onClose();

        // 생성된 이미지 URL을 state로 전달하며 /similarQuestion 페이지로 이동
        navigate('/similarQuestion', { state: { generatedImage } });
      } else {
        alert('업로드 실패!');
      }
    } catch (error) {
      console.error('업로드 오류:', error);
      alert('서버 오류 발생!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
      ></div>
      <div className={styles.modal}>
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
            onClick={onClose}
          />
          <CustomButton
            size='middle'
            color='blue'
            type='filled'
            text='네'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default SimilerQuestionModal;
