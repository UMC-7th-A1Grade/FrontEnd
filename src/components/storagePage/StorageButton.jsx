import { useState, useRef } from "react";
import styles from "../../styles/storagePage/storageButton.module.css";

export default function StorageButton() {
  const [activeButton, setActiveButton] = useState(null);
  const containerRef = useRef(null);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div className={styles.allContainer}>
      <div ref={containerRef} className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${activeButton === 1 ? styles.active : ""}`}
          onClick={() => handleButtonClick(1)}
        >
          전체 보기
        </button>
        <button
          className={`${styles.button} ${activeButton === 2 ? styles.active : ""}`}
          onClick={() => handleButtonClick(2)}
        >
          내가 틀린 문제 보기
        </button>
        <button
          className={`${styles.button} ${activeButton === 3 ? styles.active : ""}`}
          onClick={() => handleButtonClick(3)}
        >
          유사 문제 보기
        </button>
        <button
          className={`${styles.button} ${activeButton === 4 ? styles.active : ""}`}
          onClick={() => handleButtonClick(4)}
        >
          기억 저장소
        </button>
      </div>
    </div>
  );
}
