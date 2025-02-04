//import { useContext } from 'react';
import styles from '../../styles/similarQuestionPage/explanationButton.module.css';
import CustomButton from '../global/CustomButton';
import { useNavigate } from 'react-router-dom';
//import { SimilarContext } from '../../contexts/SimilarContext.jsx';
// import axios from 'axios';

export default function ExplanationButton() {
 /// const { similarData } = useContext(SimilarContext);
  const navigate = useNavigate();

  const clickSave = () => {
    navigate('/similarQuestion');
  }

  // const clickSave = () => {
    
  //   saveSimilar(imageUrl, similarData.memo, similarData.answer);
  //   navigate('/storage');
  // };

  // const saveSimilar = async (imageUrl, memo, answer) => {
  //   const token = localStorage.getItem('accessToken');

  //   const requestBody = {
  //     memo,
  //     imageUrl,
  //     type: 'AI',
  //     answer,
  //   };

  //   try {
  //     await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/question/save`, requestBody, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('저장 오류:', error);
  //     alert('서버 오류 발생!');
  //   }
  // };

  return (
    <div className={styles.allContainer}>
      <CustomButton
        size='large'
        color='darkBlue'
        type='filled'
        text='돌아가기'
        onClick={clickSave}
      />
    </div>
  );
}
