import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import styles from '../styles/MyPage.module.css';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip);

export default function MyPage() {
  const chartDataList = [
    { label: '1등급', correct: 50, total: 100 },
    { label: '2등급', correct: 40, total: 100 },
    { label: '3등급', correct: 30, total: 100 },
    { label: '4등급', correct: 20, total: 100 },
    { label: '5등급', correct: 10, total: 100 },
  ];

  const renderChart = (correct, total) => {
    return {
      datasets: [
        {
          data: [correct, total - correct],
          backgroundColor: correct / total > 0.1 ? ['#00D4DC', '#C6F6F8'] : ['#00203E', '#85A5B6'],
          borderWidth: 0,
        },
      ],
    };
  };

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.title}>홍길동님</h2>
      <p className={styles.subtitle}>오늘의 정답률</p>
      <div className={styles.chartContainer}>
        {chartDataList.map((item, index) => (
          <div
            key={index}
            className={styles.chartWrapper}
          >
            <div className={styles.chart}>
              <Doughnut
                data={renderChart(item.correct, item.total)}
                options={{ cutout: '70%' }}
              />
              <div className={styles.chartLabel}>{item.label}</div>
            </div>
            <span className={styles.chartText}>오답 정답 {item.correct}개</span>
          </div>
        ))}
      </div>
      <button className={styles.rankBtn}>1등급 경쟁 보러가기</button>
    </div>
  );
}
