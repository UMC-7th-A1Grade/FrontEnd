import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/randomPage/RandomQuestionPage.module.css';
import Header from '../components/global/Header.jsx';
import CustomButton from '../components/global/CustomButton.jsx';
import Handwriting from '../components/randomPage/Handwriting.jsx';
import { useTimer } from '../components/randomPage/TimerContext';
import AnswerModal from '../components/randomPage/AnswerModal.jsx';

function RandomQuestionPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { time } = useTimer();
  const [inputAnswer, setInputAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 여기서 문제 정보 가져옵니다
  const problems = location.state?.problems || [];
  const problemIndex = problems.findIndex((p) => p.id === Number(problemId));
  const problemData = problems[problemIndex];

  useEffect(() => {
    if (!problemData) {
      navigate('/random');
    }
  }, [problemData, navigate]);

  const handleSubmit = () => {
    const correct = Number(inputAnswer) === problemData.answer;
    setIsCorrect(correct);
    setIsModalOpen(true);

    if (correct) {
      problems[problemIndex].solved = true; 
    }
  };

  const handleBack = () => {
    navigate('/random', { state: { problems } }); 
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {problemData && (
          <div className={styles.problemContainer} style={{ backgroundImage: `url(${problemData.bgImage})` }} />
        )}
        <div className={styles.mainText}>자유롭게</div>
        <div className={styles.mainText}>필기할 수 있어요</div>
        <div className={styles.answerContainer}>
          <input
            type="text"
            placeholder="답"
            className={styles.input}
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
          />
          <Handwriting />
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton size="small" color="gray" type="filled" text="돌아가기" onClick={handleBack} />
          <CustomButton size="small" color="blue" type="filled" text="제출하기" onClick={handleSubmit} />
        </div>
      </div>

      <AnswerModal isOpen={isModalOpen} isCorrect={isCorrect} onClose={handleBack} onExplain={() => {}} />
    </>
  );
}

export default RandomQuestionPage;
