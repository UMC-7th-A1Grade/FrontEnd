//더미데이터 넣은 버전. 

// import React, { useState, useEffect, useRef } from 'react';
// import styles from './ImageSlider.module.css';

// const ImageSlider = ({ currentPage, onPageChange, onImageClick }) => {
//   const [images] = useState([
//     '/src/assets/images/home/math_1.png',
//     '/src/assets/images/home/math_2.png',
//     '/src/assets/images/home/math_3.png',
//     '/src/assets/images/home/math_4.png',
//     '/src/assets/images/home/math_5.png'
//   ]);
//   const [loadedImages, setLoadedImages] = useState({});
//   const [direction, setDirection] = useState('right');
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [currentTranslate, setCurrentTranslate] = useState(0);
//   const sliderRef = useRef(null);

//   // 이미지 프리로딩 처리 (테스트를 위한 지연 추가)
//   useEffect(() => {
//     images.forEach((src) => {
//       const img = new Image();
//       img.src = src;
//       img.onload = () => {
//         // 3초 지연 추가
//         setTimeout(() => {
//           setLoadedImages(prev => ({
//             ...prev,
//             [src]: true
//           }));
//         }, 3000);
//       };
//     });
//   }, [images]);

//   useEffect(() => {
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
//   }, [currentPage, direction, images.length, onPageChange, isDragging]);

//   const handleDragStart = (clientX) => {
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

//     if (currentTranslate > 30 && currentPage > 0) {
//       onPageChange(currentPage - 1);
//     } else if (currentTranslate < -30 && currentPage < images.length - 1) {
//       onPageChange(currentPage + 1);
//     }

//     setIsDragging(false);
//     setCurrentTranslate(0);
//   };

//   const handleImageClick = (image, index, e) => {
//     if (!isDragging && onImageClick) {
//       e.stopPropagation();
//       onImageClick(image, index);
//     }
//   };

//   return (
//     <div className={styles.slider}>
//       {images.map((image, index) => {
//         let position;
//         if (index === currentPage - 2) position = 'farLeft';
//         else if (index === currentPage - 1) position = 'left';
//         else if (index === currentPage) position = 'center';
//         else if (index === currentPage + 1) position = 'right';
//         else if (index === currentPage + 2) position = 'farRight';
//         else return null;

//         return (
//           <div
//             key={index}
//             className={`${styles.slider__item} ${styles[`slider__item--${position}`]}`}
//             style={{
//               transform: isDragging ? `translateX(${currentTranslate}px)` : undefined
//             }}
//             onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
//             onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
//             onTouchEnd={handleDragEnd}
//             onMouseDown={(e) => handleDragStart(e.clientX)}
//             onMouseMove={(e) => handleDragMove(e.clientX)}
//             onMouseUp={handleDragEnd}
//             onMouseLeave={() => isDragging && handleDragEnd()}
//             onClick={(e) => handleImageClick(image, index, e)}
//           >
//             {!loadedImages[image] ? (
//               <div className={styles.skeleton_loader}>
//                 <div className={styles.skeleton_shimmer}></div>
//               </div>
//             ) : (
//               <img
//                 src={image}
//                 alt={`Slide ${index + 1}`}
//                 className={styles.slider__image}
//                 draggable="false"
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ImageSlider;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ImageSlider.module.css';

// API 기본 설정
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const ImageSlider = ({ currentPage, onPageChange, onImageClick }) => {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [direction, setDirection] = useState('right');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  // API에서 이미지 가져오기
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/question/recent');
        
        console.log('API Response:', response.data); // 응답 구조 확인용
        
        if (response.data && response.data.isSuccess) {
          const imageUrls = response.data.result.map(item => item.imageUrl);
          setImages(imageUrls);
        } else {
          throw new Error(response.data.message || '이미지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('API Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setError(error.message || '이미지를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 이미지 프리로딩
  useEffect(() => {
    if (images.length > 0) {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages(prev => ({
            ...prev,
            [src]: true
          }));
        };
      });
    }
  }, [images]);

  // 자동 슬라이드 효과
  useEffect(() => {
    if (images.length === 0) return;

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

    if (currentTranslate > 30 && currentPage > 0) {
      onPageChange(currentPage - 1);
    } else if (currentTranslate < -30 && currentPage < images.length - 1) {
      onPageChange(currentPage + 1);
    }

    setIsDragging(false);
    setCurrentTranslate(0);
  };

  const handleImageClick = (image, index, e) => {
    if (!isDragging && onImageClick) {
      e.stopPropagation();
      onImageClick(image, index);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (images.length === 0) {
    return <div className={styles.empty}>No images available</div>;
  }

  return (
    <div className={styles.slider}>
      {images.map((image, index) => {
        let position;
        if (index === currentPage - 2) position = 'farLeft';
        else if (index === currentPage - 1) position = 'left';
        else if (index === currentPage) position = 'center';
        else if (index === currentPage + 1) position = 'right';
        else if (index === currentPage + 2) position = 'farRight';
        else return null;

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
            onClick={(e) => handleImageClick(image, index, e)}
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
      })}
    </div>
  );
};

export default ImageSlider;


