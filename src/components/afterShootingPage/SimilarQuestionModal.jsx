import styles from '../../styles/afterShootingPage/similarQuestionModal.module.css';

const SimilerQuestionModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
      ></div>
      <div className={styles.modal}>{children}</div>
    </>
  );
};

export default SimilerQuestionModal;
