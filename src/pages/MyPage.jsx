import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import styles from '../styles/MyPage.module.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMycorrect } from '../apis/myPage';
import Loading from '../components/common/Loading';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip);

export default function MyPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['mypage'],
    queryFn: getMycorrect,
  });

  if (isLoading) return <Loading msg='사용자 정보를 불러오는 중이에요' />;

  const totalPerGrade = 10; // 각 등급별 최대 문제 개수
  let remaining = data?.result.grade ?? 30; // API에서 받아온 정답 개수 (없으면 0)

  // 등급별 정답 개수 가공
  const chartDataList = ['1등급', '2등급', '3등급', '4등급', '5등급']
    .map((label) => {
      const correct = Math.min(remaining, totalPerGrade);
      remaining = Math.max(remaining - totalPerGrade, 0);
      return { label, correct, total: totalPerGrade };
    })
    .reverse(); // 5등급부터 표시하도록 정렬

  // 차트 데이터 생성 함수
  const renderChart = (correct, total) => {
    const isConquered = correct === total;
    return {
      datasets: [
        {
          data: [correct, total - correct],
          backgroundColor: isConquered ? ['#00203E', '#85A5B6'] : ['#00D4DC', '#C6F6F8'],
          borderWidth: 0,
        },
      ],
    };
  };

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.title}>{data?.result.nickName ?? '사용자'}님</h2>
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
            <span className={styles.chartText}>오답 정답 {(5 - index) * 10}개</span>
          </div>
        ))}
      </div>
      <Link to='/ranking'>
        <button className={styles.rankBtn}>1등급 경쟁 보러가기</button>
      </Link>
    </div>
  );
}
