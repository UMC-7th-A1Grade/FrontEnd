import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/randomPage/RandomQuestionPage.module.css';
import Header from '../components/global/Header.jsx';
import CustomButton from '../components/global/CustomButton.jsx';
import Handwriting from '../components/randomPage/Handwriting.jsx';
import { useTimer } from '../components/randomPage/TimerContext';
import AnswerModal from '../components/randomPage/AnswerModal.jsx';
import Calculator from '../components/global/Calculator.jsx';

function RandomQuestionPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { time } = useTimer();
  const [inputAnswer, setInputAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const inputRef = useRef(null);
  const calculatorRef = useRef(null);
  const handwritingRef = useRef(null);

  // 문제 정보 가져오기
  const problems = location.state?.problems || [];
  const problemIndex = problems.findIndex((p) => p.id === Number(problemId));
  const problemData = problemIndex !== -1 ? problems[problemIndex] : null;

  useEffect(() => {
    if (!problemData) {
      navigate('/random');
    }
  }, [problemData, navigate]);

  const submitAnswer = async () => {
    if (!problemData) return;
  
    // answer가 비어있는지 확인 (공백 제거 후)
    if (!inputAnswer.trim()) {
      alert('답안을 입력해주세요.');
      return;
    }
  
    const handwritingImage = handwritingRef.current?.getCanvasImage();
  
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    // 전송할 데이터는 여기에서 확인 가능합니다~ 
    const payload = {
      note: handwritingImage, // 필기 내용이 없더라도 빈 값이 전달됨
      answer: inputAnswer,
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/question/${problemId}/submit/`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const data = response.data;
      if (data.isSuccess) {
        setIsCorrect(data.result.correct);
        setIsModalOpen(true);
        // 정답 여부와 상관없이 제출 시 표시됨 (수정됨)
        problems[problemIndex].solved = true;
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('답안을 제출하는 도중 오류가 발생했습니다.');
      console.error(error);
    }
  };
  

  const handleBack = () => {
    navigate('/random', { state: { problems } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        calculatorRef.current && !calculatorRef.current.contains(event.target)
      ) {
        setShowCalculator(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            onClick={() => setShowCalculator(true)}
            ref={inputRef}
          />
          {showCalculator && (
            <div className={styles.calculatorContainer} ref={calculatorRef}>
              <Calculator input={inputAnswer} setInput={setInputAnswer} />
            </div>
          )}
          <Handwriting ref={handwritingRef} /> 
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton size="small" color="gray" type="filled" text="돌아가기" onClick={handleBack} />
          <CustomButton size="small" color="blue" type="filled" text="제출하기" onClick={submitAnswer} />
        </div>
      </div>

      <AnswerModal 
        isOpen={isModalOpen} 
        isCorrect={isCorrect} 
        onClose={handleBack} 
        questionId={problemId} 
      />
    </>
  );
}

export default RandomQuestionPage;
