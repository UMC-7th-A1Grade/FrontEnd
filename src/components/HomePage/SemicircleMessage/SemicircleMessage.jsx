import React from 'react';
import styles from './SemicircleMessage.module.css';

const encouragingMessages = [
  "A1등급와 함께 공부하면 더 재미있어요 ✨",
  "A1등급이 당신의 학습을 응원해요 💪",
  "A1등급과 함께 성장하는 즐거움을 느껴보세요 🌱",
  "A1등급이 당신의 학습 패턴을 분석하고 있어요 🔍",
  "오늘도 열심히 공부하는 당신, 화이팅! 🎯",
  "실수해도 괜찮아요, A1등급이 함께할게요 💡",
  "한 걸음씩 성장하는 중이에요 🚀",
  "오늘의 학습도 A1등급과과 함께해요 ⭐",
  "열심히 하는 당신이 자랑스러워요 🏆"
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
          {'AI의 Ai가 당신의 오답을 기록해놨어요'.split('AI').map((part, index, array) => (
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