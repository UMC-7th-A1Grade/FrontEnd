import styles from '../../styles/cameraPage/Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinWrapper}>
        <div className={styles.spinner} />
        <img src='/logo.png' />
      </div>
      <p className={styles.loadingText}>문제가 만들어지고 있어요!</p>
    </div>
  );
}
