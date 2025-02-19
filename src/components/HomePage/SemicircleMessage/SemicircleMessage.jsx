import React from 'react';
import styles from './SemicircleMessage.module.css';

const encouragingMessages = [
  "실수해도 괜찮아요, A1이 함께할게요 🩵",
  "오늘의 1위는 누구? 전국의 A1 유저들과 경쟁해봐요! 🏆",
  "매일 한 걸음씩 성장하는 즐거움을 느껴보세요 🎵",
  "오늘도 A1과 함께하는 당신의 미래는 반짝 ⭐",
  "사진을 업로드해보세요! 비슷한 문제를 직접 생성할 수 있어요 📝",
  "포기하지 않는 당신이 바로 진정한 1등급 🔥",
  "아는 것이 힘! A1과 함께하는 당신, 오늘도 강해지는 중 💪",
  "A1등급이 항상 응원하고 있을게요 🍀",
];

const SemicircleMessage = () => {
  const handleClick = () => {
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    alert(randomMessage);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.semicircle}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="AI 메시지"
      >
        <p className={styles.messageText}>
          {'A1의 Ai가 당신의 오답을 기록해놨어요'.split('AI').map((part, index, array) => (
            <React.Fragment key={index}>
              {index > 0 && <span className={styles.highlight}>AI</span>}
              {part}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default SemicircleMessage;