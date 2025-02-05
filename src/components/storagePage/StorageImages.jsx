import { useState } from 'react';
import styles from '../../styles/storagePage/storageImages.module.css';
import ProblemCard from './ProblemCard.jsx';
import { FiTrash2 } from 'react-icons/fi';
import DeleteModal from './DeleteModal';

export default function StorageImages({ filter }) {
  const [showCheckboxes, setShowCheckboxes] = useState(false); // 체크박스 표시 여부
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 여부
  const [checkedImages, setCheckedImages] = useState([]); // 체크된 이미지 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  // 삭제 버튼 클릭 처리
  const handleDeleteClick = () => {
    if (checkedImages.length > 0) {
      setIsModalOpen(true); // 체크된 이미지가 있으면 모달 열기
    } else {
      setShowCheckboxes(!showCheckboxes); // 체크박스 표시/숨김
      if (showCheckboxes) setSelectAll(false); // 숨길 때 전체 선택 해제
    }
  };

  // 전체 선택/해제 처리
  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
  };

  // ProblemCard로부터 체크된 이미지 전달 받기
  const handleCheckedImagesChange = (checkedImagesFromChild) => {
    setCheckedImages(checkedImagesFromChild);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.buttonContainer}>
        {showCheckboxes && (
          <div className={styles.selectAllContainer}>
            <input
              type='checkbox'
              id='selectAll'
              checked={selectAll}
              onChange={handleSelectAllChange}
              className={styles.selectAllCheckbox}
            />
            <label
              htmlFor='selectAll'
              className={styles.selectAllLabel}
            >
              전체 선택하기
            </label>
          </div>
        )}
        <button
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          <FiTrash2 className={styles.icon} />
          <div className={styles.text}>삭제하기</div>
        </button>
      </div>

      <div className={styles.imageContainer}>
        <ProblemCard
          filters={filter}
          showCheckboxes={showCheckboxes}
          selectAll={selectAll}
          onCheckedImagesChange={handleCheckedImagesChange}
        />
      </div>

      <div className={styles.homeButtonContainer}>
        <button className={styles.homeButton}>홈화면으로 가기</button>
        <div className={styles.overlay}></div>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        checkedImages={checkedImages}
      />
    </div>
  );
}
