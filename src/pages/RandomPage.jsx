import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/randomPage/RandomPage.module.css';
import Timer from '../components/randomPage/Timer.jsx';
import Problem from '../components/randomPage/RandomProblem.jsx';
import Header from '../components/global/Header.jsx';
import Loading from '../components/common/Loading';
import { useTimer } from '../components/randomPage/TimerContext';
import EmptyRandomPage from './EmptyRandomPage';

function RandomPage() {
  const navigate = useNavigate();
  const { startTimer } = useTimer();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/question/random`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.isSuccess) {
          // API에서 받은 questions 배열을 매핑하여 문제 객체로 변환함
          const mappedProblems = res.data.result.questions.map((question, index) => ({
            id: question.id,
            title: `랜덤 문제 ${index + 1}`,
            solved: question.submitted,
            bgImage: question.questionImg,
          }));
          setProblems(mappedProblems);
        } else {
          console.error('API 응답 실패:', res.data.message);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleProblemClick = (id) => {
    // 이미 제출된 문제라면 alert
    const clickedProblem = problems.find(problem => problem.id === id);
    if (clickedProblem && clickedProblem.solved) {
      alert('이미 정답을 제출했어요.');
      return;
    }
    startTimer();
    navigate(`/randomQuestion/${id}`, { state: { problems } });
  };

  if (loading) {
    return <Loading msg="랜덤 문제를 불러오는 중이에요" />;
  }

  // 문제 배열이 비어있으면 EmptyRandomPage를 렌더링합니다~
  if (problems.length === 0) {
    return <EmptyRandomPage />;
  }

  return (
    <>
      <Header />
      <div className={styles.titleSpacer} />
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>오늘의 3문제</div>
        <Timer />
      </div>
      <div className={styles.problemContainer}>
        {problems.map((problem) => (
          <Problem
            key={problem.id}
            problemNo={problem.title}
            solved={problem.solved}
            bgImage={problem.bgImage}
            onClick={() => handleProblemClick(problem.id)}
          />
        ))}
      </div>
    </>
  );
}

export default RandomPage;
