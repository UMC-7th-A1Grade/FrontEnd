import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/rankingPage/RankingPage.module.css';
import UserCard from '../components/rankingPage/UserCard.jsx';

import characterA from '../assets/images/rankingPage/모자4.png';
import characterB from '../assets/images/rankingPage/머리2.png';
import characterC from '../assets/images/rankingPage/안경1.png';
import ranking1 from '../assets/images/rankingPage/1stRankBar.png';
import ranking2 from '../assets/images/rankingPage/2ndRankBar.png';
import ranking3 from '../assets/images/rankingPage/3rdRankBar.png';

function RankingPage() {
  const rankingData = [
    { name: '정하윤님', character: characterB }, // 1위
    { name: '임채현님', character: characterA }, // 2위
    { name: '홍길동님', character: characterC }, // 3위
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: '100%', transition: { duration: 1 } },
  };

  return (
    <>
      <div className={styles.textContainerTop}>
        <div className={styles.titleText}>축하합니다!</div>
        <div className={styles.mvpText}>오늘의 MVP {rankingData[0].name}</div>
        <div className={styles.infoText}>매일 밤 12시 초기화 됩니다.</div>
      </div>
      <motion.div
        className={styles.rankContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 1위 영역 */}
        <motion.div
          variants={itemVariants}
          style={{ order: 1 }}
          className={styles.rankItem}
        >
          <UserCard name={rankingData[0].name} character={rankingData[0].character} />
          <motion.img
            src={ranking1}
            alt="1위 그래프"
            className={styles.rankingIcon}
            variants={imageVariants}
          />
        </motion.div>

        {/* 2위 영역 */}
        <motion.div
          variants={itemVariants}
          style={{ order: 0 }}
          className={styles.rankItem}
        >
          <UserCard name={rankingData[1].name} character={rankingData[1].character} />
          <motion.img
            src={ranking2}
            alt="2위 그래프"
            className={styles.rankingIcon}
            variants={imageVariants}
          />
        </motion.div>

        {/* 3위 영역 */}
        <motion.div
          variants={itemVariants}
          style={{ order: 2 }}
          className={styles.rankItem}
        >
          <UserCard name={rankingData[2].name} character={rankingData[2].character} />
          <motion.img
            src={ranking3}
            alt="3위 그래프"
            className={styles.rankingIcon}
            variants={imageVariants}
          />
        </motion.div>
      </motion.div>
      <div className={styles.textContainerBtm}>
        <div className={styles.titleTextBtm}>지금까지 총 해결한 오답 개수 및 오늘의 정답률</div>
        <div className={styles.infoTextBtm}>1순위 오늘의 오답 정답 개수/2순위 정답률</div>
        <div className={styles.infoTextBtm}>두가지를 종합해 산정 됩니다</div>
      </div>
    </>
  );
}

export default RankingPage;