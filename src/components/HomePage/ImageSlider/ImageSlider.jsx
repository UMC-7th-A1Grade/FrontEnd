//더미데이터 입력된 버전 
import React, { useState, useEffect } from 'react';
import styles from './ImageSlider.module.css';

const ImageSlider = ({ currentPage, onPageChange, onImageClick, images }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [direction, setDirection] = useState('right');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  // 일부러 스켈레톤 ui를 넣었어요. 
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setTimeout(() => {
          setLoadedImages(prev => ({
            ...prev,
            [src]: true
          }));
        }, 500);
      };
    });
  }, [images]);

  // 자동 슬라이드 (이미지가 2개 이상일 때만 작동)
  useEffect(() => {
    if (images.length < 2) return;

    const interval = setInterval(() => {
      if (!isDragging) {
        if (direction === 'right') {
          if (currentPage < images.length - 1) {
            onPageChange(currentPage + 1);
          } else {
            setDirection('left');
            onPageChange(currentPage - 1);
          }
        } else {
          if (currentPage > 0) {
            onPageChange(currentPage - 1);
          } else {
            setDirection('right');
            onPageChange(currentPage + 1);
          }
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, direction, images.length, onPageChange, isDragging]);

  const handleDragStart = (clientX) => {
    if (images.length < 2) return; // 이미지가 1개일 때는 드래그 비활성화
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setCurrentTranslate(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const minSwipeDistance = 30; // 최소 스와이프 거리
    
    if (currentTranslate > minSwipeDistance && currentPage > 0) {
      onPageChange(currentPage - 1);
    } else if (currentTranslate < -minSwipeDistance && currentPage < images.length - 1) {
      onPageChange(currentPage + 1);
    }

    setIsDragging(false);
    setCurrentTranslate(0);
  };

  const EmptyState = () => (
    <div className={styles.empty_state}>
      <p className={styles.empty_state__title}>아직 입력된 문제가 없습니다</p>
      <p className={styles.empty_state__subtitle}>카메라 버튼을 눌러 문제를 추가해보세요!</p>
    </div>
  );

  const renderImages = () => {
    if (images.length === 0) {
      return <EmptyState />;
    }

    return images.map((image, index) => {
      let position;
      
      // 이미지 개수별 위치 설정
      if (images.length === 1) {
        position = 'center';
      } else if (images.length === 2) {
        if (index === currentPage) position = 'center';
        else position = currentPage === 0 ? 'right' : 'left';
      } else if (images.length === 3) {
        if (index === currentPage) position = 'center';
        else if (index === (currentPage + 1) % 3) position = 'right';
        else position = 'left';
      } else {
        if (index === currentPage) position = 'center';
        else if (index === (currentPage + 1) % images.length) position = 'right';
        else if (index === (currentPage - 1 + images.length) % images.length) position = 'left';
        if (index === (currentPage + 2) % images.length) position = 'farRight';
        else if (index === (currentPage - 2 + images.length) % images.length) position = 'farLeft';
      }

      if (!position) return null;

      return (
        <div
          key={index}
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
          {!loadedImages[image] ? (
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
  };

  return (
    <div className={styles.slider}>
      {renderImages()}
    </div>
  );
};

export default ImageSlider;


// import React, { useState, useEffect } from 'react';
// import styles from './ImageSlider.module.css';

// const ImageSlider = ({ currentPage, onPageChange, onImageClick, images, isLoading }) => {
//   const [loadedImages, setLoadedImages] = useState({});
//   const [direction, setDirection] = useState('right');
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [currentTranslate, setCurrentTranslate] = useState(0);

//   // 이미지 로딩 처리
//   useEffect(() => {
//     if (!isLoading && images.length > 0) {
//       images.forEach((src) => {
//         const img = new Image();
//         img.src = src;
//         img.onload = () => {
//           setTimeout(() => {
//             setLoadedImages(prev => ({
//               ...prev,
//               [src]: true
//             }));
//           }, 500);
//         };
//       });
//     }
//   }, [images, isLoading]);

//   // 자동 슬라이드 (이미지가 2개 이상일 때만 작동)
//   useEffect(() => {
//     if (images.length < 2 || isLoading) return;

//     const interval = setInterval(() => {
//       if (!isDragging) {
//         if (direction === 'right') {
//           if (currentPage < images.length - 1) {
//             onPageChange(currentPage + 1);
//           } else {
//             setDirection('left');
//             onPageChange(currentPage - 1);
//           }
//         } else {
//           if (currentPage > 0) {
//             onPageChange(currentPage - 1);
//           } else {
//             setDirection('right');
//             onPageChange(currentPage + 1);
//           }
//         }
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentPage, direction, images.length, onPageChange, isDragging, isLoading]);

//   const handleDragStart = (clientX) => {
//     if (images.length < 2 || isLoading) return; // 이미지가 1개이거나 로딩 중일 때는 드래그 비활성화
//     setIsDragging(true);
//     setStartX(clientX);
//   };

//   const handleDragMove = (clientX) => {
//     if (!isDragging) return;
//     const diff = clientX - startX;
//     setCurrentTranslate(diff);
//   };

//   const handleDragEnd = () => {
//     if (!isDragging) return;

//     const minSwipeDistance = 30; // 최소 스와이프 거리
    
//     if (currentTranslate > minSwipeDistance && currentPage > 0) {
//       onPageChange(currentPage - 1);
//     } else if (currentTranslate < -minSwipeDistance && currentPage < images.length - 1) {
//       onPageChange(currentPage + 1);
//     }

//     setIsDragging(false);
//     setCurrentTranslate(0);
//   };

//   const EmptyState = () => (
//     <div className={styles.empty_state}>
//       <p className={styles.empty_state__title}>아직 입력된 문제가 없습니다</p>
//       <p className={styles.empty_state__subtitle}>카메라 버튼을 눌러 문제를 추가해보세요!</p>
//     </div>
//   );

//   const LoadingState = () => (
//     <div className={styles.skeleton_loader}>
//       <div className={styles.skeleton_shimmer}></div>
//     </div>
//   );

//   const renderImages = () => {
//     if (isLoading) {
//       return <LoadingState />;
//     }

//     if (images.length === 0) {
//       return <EmptyState />;
//     }

//     return images.map((image, index) => {
//       let position;
      
//       // 이미지 개수별 위치 설정
//       if (images.length === 1) {
//         position = 'center';
//       } else if (images.length === 2) {
//         if (index === currentPage) position = 'center';
//         else position = currentPage === 0 ? 'right' : 'left';
//       } else if (images.length === 3) {
//         if (index === currentPage) position = 'center';
//         else if (index === (currentPage + 1) % 3) position = 'right';
//         else position = 'left';
//       } else {
//         if (index === currentPage) position = 'center';
//         else if (index === (currentPage + 1) % images.length) position = 'right';
//         else if (index === (currentPage - 1 + images.length) % images.length) position = 'left';
//         if (index === (currentPage + 2) % images.length) position = 'farRight';
//         else if (index === (currentPage - 2 + images.length) % images.length) position = 'farLeft';
//       }

//       if (!position) return null;

//       return (
//         <div
//           key={index}
//           className={`${styles.slider__item} ${styles[`slider__item--${position}`]}`}
//           style={{
//             transform: isDragging ? `translateX(${currentTranslate}px)` : undefined
//           }}
//           onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
//           onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
//           onTouchEnd={handleDragEnd}
//           onMouseDown={(e) => handleDragStart(e.clientX)}
//           onMouseMove={(e) => handleDragMove(e.clientX)}
//           onMouseUp={handleDragEnd}
//           onMouseLeave={() => isDragging && handleDragEnd()}
//           onClick={(e) => !isDragging && onImageClick && onImageClick(image, index, e)}
//         >
//           {!loadedImages[image] ? (
//             <div className={styles.skeleton_loader}>
//               <div className={styles.skeleton_shimmer}></div>
//             </div>
//           ) : (
//             <img
//               src={image}
//               alt={`Slide ${index + 1}`}
//               className={styles.slider__image}
//               draggable="false"
//             />
//           )}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className={styles.slider}>
//       {renderImages()}
//     </div>
//   );
// };

// export default ImageSlider;