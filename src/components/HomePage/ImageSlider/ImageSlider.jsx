import React, { useState, useEffect, useCallback } from 'react';
import styles from './ImageSlider.module.css';
import { BiErrorCircle } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';

const ImageSlider = ({ 
  currentPage, 
  onPageChange, 
  onImageClick, 
  images, 
  isLoading,
  isError,
  onRetry 
}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [direction, setDirection] = useState('right');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const handleImageLoad = useCallback((src) => {
    setLoadedImages(prev => new Set(prev).add(src));
  }, []);

  // 이미지 삭제 시 실시간 반영을 위한 이미지 유효성 검사
  const validateImage = useCallback(async (src) => {
    try {
      const response = await fetch(src, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      setLoadedImages(new Set());
      
      images.forEach(async (src) => {
        if (src) {
          // 이미지 유효성 검사 추가
          const isValid = await validateImage(src);
          if (isValid) {
            const img = new Image();
            img.src = src;
            img.onload = () => handleImageLoad(src);
          } else {
            // 유효하지 않은 이미지 처리
            console.log('Invalid image:', src);
          }
        }
      });
    }
  }, [images, isLoading, handleImageLoad, validateImage]);

  useEffect(() => {
    if (images.length < 2 || isLoading || isDragging) return;

    const interval = setInterval(() => {
      const nextPage = direction === 'right'
        ? currentPage < images.length - 1 
          ? currentPage + 1 
          : (() => { setDirection('left'); return currentPage - 1; })()
        : currentPage > 0
          ? currentPage - 1
          : (() => { setDirection('right'); return currentPage + 1; })();
      
      onPageChange(nextPage);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, direction, images.length, onPageChange, isDragging, isLoading]);

  const handleDragStart = useCallback((clientX) => {
    if (images.length < 2 || isLoading) return;
    setIsDragging(true);
    setStartX(clientX);
  }, [images.length, isLoading]);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setCurrentTranslate(diff);
  }, [isDragging, startX]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const minSwipeDistance = 30;
    
    if (currentTranslate > minSwipeDistance && currentPage > 0) {
      onPageChange(currentPage - 1);
    } else if (currentTranslate < -minSwipeDistance && currentPage < images.length - 1) {
      onPageChange(currentPage + 1);
    }

    setIsDragging(false);
    setCurrentTranslate(0);
  }, [isDragging, currentTranslate, currentPage, images.length, onPageChange]);

  const EmptyState = () => (
    <div className={styles.empty_state}>
      <p className={styles.empty_state__title}>아직 입력된 문제가 없습니다</p>
      <p className={styles.empty_state__subtitle}>카메라 버튼을 눌러 문제를 추가해보세요!</p>
    </div>
  );

  const LoadingState = () => (
    <div className={styles.skeleton_loader}>
      <div className={styles.skeleton_shimmer}></div>
    </div>
  );

  const ErrorState = () => (
    <div className={styles.error_state}>
      <BiErrorCircle className={styles.error_icon} />
      <p className={styles.error_title}>일시적인 오류가 발생했습니다</p>
      <p className={styles.error_description}>잠시 후 다시 시도해 주세요</p>
      <button 
        className={styles.error_button}
        onClick={onRetry}
      >
        <MdOutlineRefresh className={styles.refresh_icon} />
        새로고침
      </button>
    </div>
  );

  const getImagePosition = useCallback((index, totalImages) => {
    if (totalImages === 1) return 'center';
    if (totalImages === 2) {
      return index === currentPage ? 'center' : currentPage === 0 ? 'right' : 'left';
    }
    if (totalImages === 3) {
      if (index === currentPage) return 'center';
      if (index === (currentPage + 1) % 3) return 'right';
      return 'left';
    }
    
    if (index === currentPage) return 'center';
    if (index === (currentPage + 1) % totalImages) return 'right';
    if (index === (currentPage - 1 + totalImages) % totalImages) return 'left';
    if (index === (currentPage + 2) % totalImages) return 'farRight';
    if (index === (currentPage - 2 + totalImages) % totalImages) return 'farLeft';
    return null;
  }, [currentPage]);

  const renderImages = useCallback(() => {
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState />;
    if (images.length === 0) return <EmptyState />;

    return images.map((image, index) => {
      const position = getImagePosition(index, images.length);
      if (!position) return null;

      return (
        <div
          key={`${image}-${index}`}
          className={`${styles.slider__item} ${styles[`slider__item--${position}`]}`}
          style={{
            transform: isDragging ? `translateX(${currentTranslate}px)` : undefined
          }}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => isDragging && handleDragEnd()}
          onClick={(e) => !isDragging && onImageClick && onImageClick(image, index, e)}
        >
          {!loadedImages.has(image) ? (
            <div className={styles.skeleton_loader}>
              <div className={styles.skeleton_shimmer}></div>
            </div>
          ) : (
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.slider__image}
              draggable="false"
            />
          )}
        </div>
      );
    });
  }, [
    isLoading,
    isError,
    images,
    isDragging,
    currentTranslate,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    onImageClick,
    loadedImages,
    getImagePosition,
    onRetry
  ]);

  return (
    <div className={styles.slider}>
      {renderImages()}
    </div>
  );
};

export default ImageSlider;