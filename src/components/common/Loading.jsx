import styles from '../../styles/cameraPage/Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinWrapper}>
        <div className={styles.spinner} />
        <img src='/logo.png' />
      </div>
      <p className={styles.loadingText}>사진이 업로드되고 있어요!</p>
    </div>
  );
}
