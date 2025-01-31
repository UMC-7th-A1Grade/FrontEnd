import React, { useState, useEffect } from 'react';
import styles from '../styles/randomPage/RandomPage.module.css';
import Timer from '../components/randomPage/Timer.jsx';
import Problem from '../components/randomPage/RandomProblem.jsx';
import Header from '../components/global/Header.jsx';
import LoadingRandomPage from './LoadingRandomPage.jsx';

// 문제 예시이미지 더미데이터 
import ex1 from '../assets/images/home/math_2.png';
import ex2 from '../assets/images/home/math_3.png';
import ex3 from '../assets/images/home/math_5.png';

function RandomPage() {
  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 문제별 데이터 관리 (임시)
  const [problems, setProblems] = useState([
    { id: 1, title: '랜덤 문제1', solved: false, bgImage: ex1 },
    { id: 2, title: '랜덤 문제2', solved: false, bgImage: ex2 },
    { id: 3, title: '랜덤 문제3', solved: false, bgImage: ex3 },
  ]);

  const [activeProblem, setActiveProblem] = useState(null);

  useEffect(() => {
    // 로딩 상태 2초 후에 해제 (임시)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const handleProblemClick = (index) => {
    setActiveProblem(index);
    // 문제를 클릭했을 때의 로직..일단은 그냥 두겠습니다
  };

  // 로딩중
  if (loading) {
    return <LoadingRandomPage />;
  }

  return (
    <>
      <Header />
      <div className={styles.titleSpacer} />
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>오늘의 3문제</div>
        <Timer start={activeProblem !== null} />
      </div>
      <div className={styles.problemContainer}>
        {problems.map((problem, index) => (
          <Problem
            key={problem.id}
            problemNo={problem.title}
            isActive={activeProblem === index}
            solved={problem.solved}
            bgImage={problem.bgImage}
            onClick={() => handleProblemClick(index)}
          />
        ))}
      </div>
    </>
  );
}

export default RandomPage;
