import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [rankingData, setRankingData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/allgrade`);
        if (res.data.isSuccess) {
          const apiData = res.data.result.map((user, index) => ({
            name: user.nickName,
            character: [characterB, characterA, characterC][index], // 기존 캐릭터 유지
          }));
          setRankingData(apiData);
        } else {
          setError('랭킹 데이터를 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setError('서버와의 연결에 실패했습니다.');
      }
    };

    fetchRankingData();
  }, []);

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
        <div className={styles.mvpText}>{rankingData.length > 0 ? `오늘의 MVP ${rankingData[0].name}` : '랭킹 불러오는 중...'}</div>
        <div className={styles.infoText}>매일 밤 12시 초기화 됩니다.</div>
      </div>

      {error ? (
        <div className={styles.errorContainer}>{error}</div>
      ) : (
        <motion.div
          className={styles.rankContainer}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {rankingData.map((user, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{ order: index === 0 ? 1 : index === 1 ? 0 : 2 }}
              className={styles.rankItem}
            >
              <UserCard name={user.name} character={user.character} />
              <motion.img
                src={[ranking1, ranking2, ranking3][index]}
                alt={`${index + 1}위 그래프`}
                className={styles.rankingIcon}
                variants={imageVariants}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <div className={styles.textContainerBtm}>
        <div className={styles.titleTextBtm}>지금까지 총 해결한 오답 개수 및 오늘의 정답률</div>
        <div className={styles.infoTextBtm}>1순위 오늘의 오답 정답 개수/2순위 정답률</div>
        <div className={styles.infoTextBtm}>두가지를 종합해 산정 됩니다</div>
      </div>
    </>
  );
}

export default RankingPage;
