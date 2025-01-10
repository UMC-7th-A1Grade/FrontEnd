import styles from '../../styles/storagePage/storageImages.module.css';
import ProblemCard from './ProblemCard.jsx';

export default function StorageImages() {
    return (
        <div className={styles.allContainer}>
            <div className={styles.imageContainer}>
                <ProblemCard />
            </div>
            <div className={styles.homeButtonContainer}>
                <button className={styles.homeButton}>홈화면으로 가기</button>
                <div className={styles.overlay}></div>
            </div>
        </div>
    )
}