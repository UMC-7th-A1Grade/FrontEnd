import styles from './Ranking.module.css';
// 일단 뷰 다 만들고 컴포넌트로 분리
import characterA from '../../assets/images/모자4.png';
import characterB from '../../assets/images/머리2.png';
import characterC from '../../assets/images/안경1.png';
import ranking1 from '../../assets/images/1stRankBar.png';
import ranking2 from '../../assets/images/2ndRankBar.png';
import ranking3 from '../../assets/images/3rdRankBar.png';

function Ranking() {
  // 임시데이터
  const rankingData = [
    { name: '임채현님', character: characterA },
    { name: '정하윤님', character: characterB },
    { name: '홍길동님', character: characterC },
  ];

  return (
    <>
      <div className={styles.textContainerTop}>
        <div className={styles.titleText}>축하합니다!</div>
        <div className={styles.mvpText}>오늘의 MVP {rankingData[1].name}</div>
        <div className={styles.infoText}>매일 밤 12시 초기화 됩니다.</div>
      </div>
      <div className={styles.rankContainer}>
        <div> {/* 2위영역 */}
          <img
            src={rankingData[0].character} 
            alt="2위 캐릭터 아이콘" 
            className={styles.characterIcon}
          />
          <div className={styles.rankName}>{rankingData[0].name}</div>
          <img
            src={ranking2} 
            alt="2위 그래프" 
            className={styles.rankingIcon}
          />
        </div>
        <div> {/* 1위영역 */}
          <img
            src={rankingData[1].character} 
            alt="1위 캐릭터 아이콘" 
            className={styles.characterIcon}
          />
          <div className={styles.rankName}>{rankingData[1].name}</div>
          <img
            src={ranking1} 
            alt="1위 그래프" 
            className={styles.rankingIcon}
          />
        </div>
        <div> {/* 3위영역 */}
          <img
            src={rankingData[2].character} 
            alt="3위 캐릭터 아이콘" 
            className={styles.characterIcon}
          />
          <div className={styles.rankName}>{rankingData[2].name}</div>
          <img
            src={ranking3} 
            alt="3위 그래프" 
            className={styles.rankingIcon}
          />
        </div>
      </div>
      <div className={styles.textContainerBtm}>
        <div className={styles.titleTextBtm}>지금까지 총 해결한 오답 개수 및 오늘의 정답률</div>
        <div className={styles.infoTextBtm}>1순위 오늘의 오답 정답 개수/2순위 정답률</div>
        <div className={styles.infoTextBtm}>두가지를 종합해 산정 됩니다</div>
      </div>
    </>
  );
};

export default Ranking;
