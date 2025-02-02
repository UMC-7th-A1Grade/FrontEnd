import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import imageSrc from "../../assets/images/storagePage/image.png";
import styles from "../../styles/storagePage/problemCard.module.css";

export default function ProblemCard({ showCheckboxes, selectAll, onCheckedImagesChange }) {
  const [images, setImages] = useState(Array(10).fill(null)); // 초기 상태: null (스켈레톤 표시)
  const [checkedImages, setCheckedImages] = useState([]);

  useEffect(() => {
    if (selectAll) {
      setCheckedImages(images.map((_, index) => index));
    } else {
      setCheckedImages([]);
    }
  }, [selectAll, images]);

  useEffect(() => {
    onCheckedImagesChange(checkedImages);
  }, [checkedImages, onCheckedImagesChange]);

  const handleCheckboxChange = (index) => {
    setCheckedImages((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  // 이미지 로딩 시뮬레이션 (2초 후 로드 완료)
  useEffect(() => {
    setTimeout(() => {
      setImages(Array(10).fill(imageSrc)); // 스켈레톤 대신 실제 이미지로 변경
    }, 2000);
  }, []);

  const loadMoreImages = () => {
    setImages((prevImages) => [...prevImages, ...Array(10).fill(null)]);
    setTimeout(() => {
      setImages((prevImages) =>
        prevImages.map((img) => (img === null ? imageSrc : img))
      );
    }, 2000);
  };

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
          {src ? (
            <img src={src} alt={`Image ${index}`} className={styles.image} />
          ) : (
            <Skeleton className={styles.skeleton} width={100} height={110} />
          )}
        </div>
      ))}
      <div id="sentinel" className={styles.sentinel}></div>
    </div>
  );
}
