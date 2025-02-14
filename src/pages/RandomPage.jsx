import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/randomPage/RandomPage.module.css';
import Timer from '../components/randomPage/Timer.jsx';
import Problem from '../components/randomPage/RandomProblem.jsx';
import Header from '../components/global/Header.jsx';
import Loading from '../components/common/Loading';
import { useTimer } from '../components/randomPage/TimerContext';

// 문제 예시 이미지 더미 데이터 (임시입니다!!)
import ex1 from '../assets/images/home/math_2.png';
import ex2 from '../assets/images/home/math_3.png';
import ex3 from '../assets/images/home/math_5.png';

function RandomPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTimer } = useTimer();
  const [loading, setLoading] = useState(true);

  const [problems, setProblems] = useState(
    location.state?.problems || [
      { id: 1, title: '랜덤 문제1', solved: false, answer: 11, bgImage: ex1 },
      { id: 2, title: '랜덤 문제2', solved: false, answer: 22, bgImage: ex2 },
      { id: 3, title: '랜덤 문제3', solved: false, answer: 33, bgImage: ex3 },
    ]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleProblemClick = (id) => {
    startTimer();
    navigate(`/randomQuestion/${id}`, { state: { problems } });
  };

  if (loading) {
    return <Loading msg='랜덤 문제를 불러오는 중이에요' />;
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
