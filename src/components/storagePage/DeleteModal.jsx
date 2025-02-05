import axios from 'axios';
import styles from '../../styles/afterShootingPage/similarQuestionModal.module.css';
import CustomButton from '../global/CustomButton';

const DeleteModal = ({ isOpen, onClose, checkedImages }) => {
  if (!isOpen) return null;

  const handleDeleteConfirm = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/storage/questions/delete`,
        { userQuestionIds: checkedImages },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log('삭제 성공');
      onClose(); // 모달 닫기
       window.location.reload(); // 새로고침 (UI 업데이트)
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.textContainer}>
          <h2>정말 삭제하시겠습니까?</h2>
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton size="middle" color="gray" type="filled" text="아니오" onClick={onClose} />
          <CustomButton size="middle" color="blue" type="filled" text="네" onClick={handleDeleteConfirm} />
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
