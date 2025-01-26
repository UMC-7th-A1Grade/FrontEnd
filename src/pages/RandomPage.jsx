import React, { useState } from 'react';
import styles from '../styles/randomPage/RandomPage.module.css';
import Timer from '../components/randomPage/Timer.jsx';
import Problem from '../components/randomPage/RandomProblem.jsx';
import Header from '../components/global/Header.jsx';

function RandomPage() {
  const [activeProblem, setActiveProblem] = useState(null);

  const handleProblemClick = (index) => {
    setActiveProblem(index);
  };

  return (
    <>
      <Header/>
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>오늘의 3문제</div>
        <Timer start={activeProblem !== null} />
      </div>
      <div className={styles.problemContainer}>
        {[1, 2, 3].map((num, index) => (
          <Problem
            key={index}
            problemNo={`랜덤 문제${num}`}
            isActive={activeProblem === index}
            onClick={() => handleProblemClick(index)}
          />
        ))}
      </div>
    </>
  );
}

export default RandomPage;
