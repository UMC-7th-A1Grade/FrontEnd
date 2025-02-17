import React from 'react';
import styles from '../../styles/randomPage/RandomProblem.module.css';
import Solved from '../../assets/images/randomPage/SolvedLogo.png';
import NotSolved from '../../assets/images/randomPage/NotSolvedLogo.png';

function RandomProblem({ problemNo, solved, bgImage, onClick }) {
  return (
    <div
      className={styles.problemContainer}
      onClick={onClick}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.problemNo}>{problemNo}</div>
      <img src={solved ? Solved : NotSolved} alt="제출 여부 아이콘" className={styles.solvedIcon} />
    </div>
  );
}

export default RandomProblem;
