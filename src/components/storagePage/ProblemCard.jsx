import { useState, useEffect } from "react";
import imageSrc from "../../assets/images/storagePage/image.png";
import styles from "../../styles/storagePage/problemCard.module.css";

export default function ProblemCard({ showCheckboxes, selectAll, onCheckedImagesChange }) {
  const [images, setImages] = useState(Array(10).fill(imageSrc)); // 초기 더미 데이터
  const [checkedImages, setCheckedImages] = useState([]); // 체크된 이미지 상태 관리

  // 체크박스 상태 관리
  useEffect(() => {
    if (selectAll) {
      setCheckedImages(images.map((_, index) => index)); // 모두 선택
    } else {
      setCheckedImages([]); // 선택 해제
    }
  }, [selectAll, images]);

  useEffect(() => {
    // 부모에게 체크된 이미지 목록 전달
    onCheckedImagesChange(checkedImages);
  }, [checkedImages, onCheckedImagesChange]);

  const handleCheckboxChange = (index) => {
    setCheckedImages((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index) // 체크 해제
        : [...prev, index] // 체크 추가
    );
  };

  // 무한 스크롤용 핸들러
  const loadMoreImages = () => {
    setImages((prevImages) => [...prevImages, ...Array(10).fill(imageSrc)]);
  };

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreImages();
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.getElementById("sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, []);

  return (
    <div className={styles.gridContainer}>
      {images.map((src, index) => (
        <div key={index} className={styles.imageWrapper}>
          {showCheckboxes && (
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={checkedImages.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
          )}
          <img src={src} alt={`Image ${index}`} className={styles.image} />
        </div>
      ))}
      <div id="sentinel" className={styles.sentinel}></div>
    </div>
  );
}
