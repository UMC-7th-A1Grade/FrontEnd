import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import styles from '../styles/cameraPage/EditPage.module.css';

export default function EditPage() {
  const location = useLocation();
  const { photo } = location.state;
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropperInstance = cropperRef.current?.cropper;
      if (cropperInstance) {
        const croppedDataUrl = cropperInstance.getCroppedCanvas().toDataURL('image/png');
        setCroppedImage(croppedDataUrl);
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {!croppedImage ? (
        <>
          <div className={styles.cropContainer}>
            <Cropper
              ref={cropperRef}
              src={photo}
              style={{ width: '90%', maxHeight: '500px' }}
              guides={true} // 그리드 표시 안 함
              viewMode={1} // 편집 가능한 모드
            />
          </div>
          <div className={styles.actions}>
            <button onClick={handleCrop}>자르기</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.croppedImageContainer}>
            <img
              src={croppedImage}
              alt='Cropped'
              style={{ width: '100%', maxWidth: '500px' }}
            />
          </div>
          <div className={styles.actions}>
            <button onClick={() => {}}>문제 제출</button>
          </div>
        </>
      )}
    </div>
  );
}
