import { useEffect, useState } from 'react';
import styles from '../../styles/afterShootingPage/questionSection.module.css';

export default function QuestionSection({ image }) {
  const [imageSrc, setImageSrc] = useState(image);

  useEffect(() => {
    if (image) {
      setImageSrc(image); // image prop이 변경될 때마다 상태를 업데이트
    }
  }, [image]);

  return (
    <div className={styles.allContainer}>
      <img
        src={imageSrc}
        className={styles.image}
        alt="촬영된 이미지"
      />
    </div>
  );
}
