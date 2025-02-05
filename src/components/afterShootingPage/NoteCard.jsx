import { useState } from 'react';
import styles from '../../styles/afterShootingPage/noteCard.module.css';
import Calculator from '../global/Calculator';
import { FaChevronDown } from 'react-icons/fa';

export default function NoteCard({ memo, setMemo, answer, setAnswer }) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const toggleCalculator = () => {
    setIsCalculatorOpen((prev) => !prev);
  };

  return (
    <div className={styles.cardContainer}>
      {/* 답 입력 필드 */}
      <div className={styles.header}>
        <input
          type='text'
          className={styles.answerInput}
          placeholder='답'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        {/* 계산기 토글 버튼*/}
        <button
          className={`${styles.toggleButton} ${isCalculatorOpen ? styles.rotated : ''}`}
          onClick={toggleCalculator}
        >
          <FaChevronDown className={styles.arrowIcon} />
        </button>
      </div>

      {/* 계산기 */}
      <div className={`${styles.calculatorContainer} ${isCalculatorOpen ? styles.open : styles.closed}`}>
        {isCalculatorOpen && (
          <Calculator
            input={answer}
            setInput={setAnswer}
          />
        )}
      </div>

      {/* 메모 입력 필드 */}
      <div className={styles.inputContainer}>
        <textarea
          placeholder='내용을 입력해주세요'
          className={styles.inputArea}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
