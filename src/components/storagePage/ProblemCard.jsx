import { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../../styles/storagePage/problemCard.module.css';
import FullPopup from '../HomePage/FullPopup/FullPopup';
import noImage from '../../assets/images/storagePage/noImage.webp';

export default function ProblemCard({ filters, showCheckboxes, selectAll, onCheckedImagesChange }) {
  const [images, setImages] = useState([]); // 이미지 상태
  const [checkedImages, setCheckedImages] = useState([]); // 체크된 이미지
  const [cursor, setCursor] = useState(null); // 첫 요청에서 받을 커서
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null); // FullPopup에 전달할 ID

  // 이미지 요청 함수
  const fetchImages = async (newCursor = null) => {
    if (loading) return; // 이미 로딩 중이면 요청 방지

    setLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/storage/questions`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          type: filters.type,
          isOverLimit: filters.isOverLimit,
          ...(newCursor && { cursor: newCursor }), // 새로운 cursor 사용
        },
      });

      const newImages = response.data.result.questions.map((q) => ({
        imageUrl: q.imageUrl,
        userQuestionId: q.userQuestionId,
      }));

      setImages((prev) => [...prev, ...newImages]);
      setCursor(response.data.result.cursor || null); // 커서 업데이트
    } catch (error) {
      console.error('이미지 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setImages([]); // 필터 변경 시 이미지 초기화
    setCursor(null); // 커서 초기화
    fetchImages(); // 첫 요청
  }, [filters]); // 필터가 변경될 때마다 요청

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (userQuestionId) => {
    setCheckedImages((prev) =>
      prev.includes(userQuestionId) ? prev.filter((id) => id !== userQuestionId) : [...prev, userQuestionId],
    );
  };

  // 이미지 클릭 핸들러 (FullPopup 열기)
  const handleImageClick = (userQuestionId) => {
    setSelectedImageId(userQuestionId);
  };

  // FullPopup 닫기 핸들러
  const handleClosePopup = () => {
    setSelectedImageId(null);
  };

  // 전체 선택 기능
  useEffect(() => {
    if (selectAll) {
      setCheckedImages(images.map((img) => img.userQuestionId));
    } else {
      setCheckedImages([]);
    }
  }, [selectAll, images]);

  // 부모 컴포넌트에 체크된 이미지 ID 전달
  useEffect(() => {
    onCheckedImagesChange(checkedImages);
  }, [checkedImages, onCheckedImagesChange]);

  // sentinel에 닿았을 때 새로운 이미지 요청
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cursor) {
          fetchImages(cursor); // sentinel에 닿으면 커서로 이미지 요청
        }
      },
      { threshold: 1.0 },
    );

    const sentinel = document.getElementById('sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [cursor]); // cursor 변경될 때마다 observer 설정
  
  return (
    <>
      {loading && images.length === 0 ? (
        <div className={styles.gridContainer}>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={index}
                className={styles.skeleton}
                width={100}
                height={110}
              />
            ))}
        </div>
      ) : images.length === 0 ? (
        <div className={styles.textContainer}>
          <img
            src={noImage}
            alt='LOGO'
          />
          <div className={styles.emptyMessage}>원하는</div>
          <div className={styles.emptyMessage}>문제를 담아주세요</div>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {images.map((img, index) => (
            <div
              key={index}
              className={styles.imageWrapper}
            >
              {showCheckboxes && (
                <input
                  type='checkbox'
                  className={styles.checkbox}
                  checked={checkedImages.includes(img.userQuestionId)}
                  onChange={() => handleCheckboxChange(img.userQuestionId)}
                />
              )}
              <img
                src={img.imageUrl}
                alt={`Image ${index}`}
                className={styles.image}
                onClick={() => handleImageClick(img.userQuestionId)}
              />
            </div>
          ))}
          <div
            id='sentinel'
            className={styles.sentinel}
          ></div>
        </div>
      )}

      {/* FullPopup 컴포넌트 */}
      {selectedImageId && (
        <FullPopup
          userQuestionId={selectedImageId}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}
