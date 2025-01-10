import { useState } from 'react';
import styles from '../../styles/storagePage/storageButton.module.css';

export default function StorageButton(){
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    return (
        <div className={styles.allContainer}>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${activeButton === 1 ? styles.active : ''}`}
                    onClick={() => handleButtonClick(1)}
                >
                    전체 보기
                </button>
                <button
                    className={`${styles.button} ${activeButton === 2 ? styles.active : ''}`}
                    onClick={() => handleButtonClick(2)}
                >
                    내가 틀린 문제 보기
                </button>
                <button
                    className={`${styles.button} ${activeButton === 3 ? styles.active : ''}`}
                    onClick={() => handleButtonClick(3)}
                >
                    유사 문제 보기
                </button>
            </div>
        </div>
    );
}