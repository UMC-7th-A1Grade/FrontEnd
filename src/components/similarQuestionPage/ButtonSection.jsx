import { useContext } from 'react';
import styles from '../../styles/afterShootingPage/buttonSection.module.css';
import CustomButton from '../global/CustomButton';
import { useNavigate } from 'react-router-dom';
import { SimilarContext } from '../../contexts/SimilarContext.jsx';
import axios from 'axios';

export default function ButtonSection() {
  const { similarData } = useContext(SimilarContext);
  const navigate = useNavigate();

  const goExplanation = () => {
    navigate('/explanation');
  };

  const handleClickSave = async () => {
    try {
      // S3에 이미지 업로드 후 URL 받아오기
      const imageUrl = await sendFileToServer();
      if (!imageUrl) {
        alert('이미지 업로드 실패!');
        return;
      }

      // AI 질문 저장 요청
      await saveSimilar(imageUrl, similarData.memo, similarData.answer);

      // 저장 완료 후 페이지 이동
      navigate('/storage');
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
    }
  };

  const sendFileToServer = async () => {
    if (!similarData.image) {
      alert('이미지가 없습니다!');
      return null;
    }

    try {
      // [이미지 -> 파일 변환]
      const base64Data = similarData.image.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      const byteArray = new Uint8Array(byteArrays);
      const blob = new Blob([byteArray], { type: 'image/png' });
      const file = new File([blob], 'image.png', { type: 'image/png' });

      // FormData 생성
      const formData = new FormData();
      formData.append('file', file);

      // 로컬스토리지에서 accessToken 가져오기
      const accessToken = localStorage.getItem('accessToken');

      // 이미지 업로드 요청
      const params = new URLSearchParams({ pathName: 'AI_QUESTION' });
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/s3/image-upload?${params}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data?.result?.imageUrl) {
        return response.data.result.imageUrl;
      } else {
        return null;
      }
    } catch (error) {
      alert('서버 오류 발생!');
      return null;
    }
  };

  const saveSimilar = async (imageUrl, memo, answer) => {
    const token = localStorage.getItem('accessToken');

    const requestBody = {
      memo,
      imageUrl,
      type: 'AI',
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
        onClick={handleClickSave}
      />
    </div>
  );
}
