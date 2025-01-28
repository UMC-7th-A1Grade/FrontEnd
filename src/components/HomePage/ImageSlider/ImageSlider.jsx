import React, { useState, useEffect, useRef } from 'react';
import styles from './ImageSlider.module.css';

const ImageSlider = ({ currentPage, onPageChange, onImageClick }) => {
  const [images] = useState([
    '/src/assets/images/home/math_1.png',
    '/src/assets/images/home/math_2.png',
    '/src/assets/images/home/math_3.png',
    '/src/assets/images/home/math_4.png',
    '/src/assets/images/home/math_5.png'
  ]);
  const [direction, setDirection] = useState('right');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
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
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.slider__image}
              draggable="false"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageSlider;

// import React, { useState, useEffect, useRef } from 'react';
// import styles from './ImageSlider.module.css';

// const ImageSlider = ({ currentPage, onPageChange }) => {
//   const [images] = useState([
//     '/src/assets/images/home/math_1.png',
//     '/src/assets/images/home/math_2.png',
//     '/src/assets/images/home/math_3.png',
//     '/src/assets/images/home/math_4.png',
//     '/src/assets/images/home/math_5.png'
//   ]);
//   const [direction, setDirection] = useState('right');
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [currentTranslate, setCurrentTranslate] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const sliderRef = useRef(null);

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

//   const handleImageClick = (index, position) => {
//     if (position === 'center') {
//       setIsModalOpen(true);
//     } else {
//       onPageChange(index);
//     }
//   };

//   return (
//     <>
//       <div className={styles.slider}>
//         {images.map((image, index) => {
//           let position;
//           if (index === currentPage - 2) position = 'farLeft';
//           else if (index === currentPage - 1) position = 'left';
//           else if (index === currentPage) position = 'center';
//           else if (index === currentPage + 1) position = 'right';
//           else if (index === currentPage + 2) position = 'farRight';
//           else return null;

//           return (
//             <div
//               key={index}
//               className={`${styles.slider__item} ${styles[`slider__item--${position}`]}`}
//               style={{
//                 transform: isDragging ? `translateX(${currentTranslate}px)` : undefined
//               }}
//               onClick={() => handleImageClick(index, position)}
//               onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
//               onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
//               onTouchEnd={handleDragEnd}
//               onMouseDown={(e) => handleDragStart(e.clientX)}
//               onMouseMove={(e) => handleDragMove(e.clientX)}
//               onMouseUp={handleDragEnd}
//               onMouseLeave={() => isDragging && handleDragEnd()}
//             >
//               <img
//                 src={image}
//                 alt={`Slide ${index + 1}`}
//                 className={styles.slider__image}
//                 draggable="false"
//               />
//             </div>
//           );
//         })}
//       </div>

//       {isModalOpen && (
//         <div 
//           className={styles.modal__overlay}
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div 
//             className={styles.modal__content}
//             onClick={e => e.stopPropagation()}
//           >
//             <img
//               src={images[currentPage]}
//               alt={`확대된 이미지 ${currentPage + 1}`}
//               className={styles.modal__image}
//             />
//             <button 
//               className={styles.modal__close}
//               onClick={() => setIsModalOpen(false)}
//             >
//               닫기
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageSlider;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import styles from './ImageSlider.module.css';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080', // 백엔드 서버 주소
//   timeout: 5000,
// });

// const ImageSlider = ({ currentPage, onPageChange }) => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [direction, setDirection] = useState('right');
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [currentTranslate, setCurrentTranslate] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const sliderRef = useRef(null);

//   const fetchImages = async () => {
//     try {
//       const response = await axios.get('/api/question/recent');  // 상대 경로로 변경
//       console.log('API Response:', response.data);
      
//       const imageArray = Array.isArray(response.data) 
//         ? response.data 
//         : response.data.data || [];
  
//       setImages(imageArray);
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Error fetching images:', err);
//       setError('이미지를 불러오는데 실패했습니다.');
//       setIsLoading(false);
//     }
//   };

//   // 컴포넌트 마운트 시 이미지 데이터 로드
//   useEffect(() => {
//     fetchImages();
//   }, []);

//   // 자동 슬라이드 효과
//   useEffect(() => {
//     if (images.length === 0) return;

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

//   const handleImageClick = (index, position) => {
//     if (position === 'center') {
//       setIsModalOpen(true);
//     } else {
//       onPageChange(index);
//     }
//   };

//   if (isLoading) {
//     return <div className={styles.loading}>로딩 중...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   if (!Array.isArray(images) || images.length === 0) {
//     return <div className={styles.empty}>표시할 이미지가 없습니다.</div>;
//   }

//   return (
//     <>
//       <div className={styles.slider}>
//         {images.map((image, index) => {
//           let position;
//           if (index === currentPage - 2) position = 'farLeft';
//           else if (index === currentPage - 1) position = 'left';
//           else if (index === currentPage) position = 'center';
//           else if (index === currentPage + 1) position = 'right';
//           else if (index === currentPage + 2) position = 'farRight';
//           else return null;

//           // 이미지 URL 가져오기 (이미지 객체의 구조에 따라 수정 필요)
//           const imageUrl = image.imageUrl || image.url || image;

//           return (
//             <div
//               key={index}
//               className={`${styles.slider__item} ${styles[`slider__item--${position}`]}`}
//               style={{
//                 transform: isDragging ? `translateX(${currentTranslate}px)` : undefined
//               }}
//               onClick={() => handleImageClick(index, position)}
//               onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
//               onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
//               onTouchEnd={handleDragEnd}
//               onMouseDown={(e) => handleDragStart(e.clientX)}
//               onMouseMove={(e) => handleDragMove(e.clientX)}
//               onMouseUp={handleDragEnd}
//               onMouseLeave={() => isDragging && handleDragEnd()}
//             >
//               <img
//                 src={imageUrl}
//                 alt={`Slide ${index + 1}`}
//                 className={styles.slider__image}
//                 draggable="false"
//               />
//             </div>
//           );
//         })}
//       </div>

//       {isModalOpen && (
//         <div 
//           className={styles.modal__overlay}
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div 
//             className={styles.modal__content}
//             onClick={e => e.stopPropagation()}
//           >
//             <img
//               src={images[currentPage].imageUrl || images[currentPage].url || images[currentPage]}
//               alt={`확대된 이미지 ${currentPage + 1}`}
//               className={styles.modal__image}
//             />
//             <button 
//               className={styles.modal__close}
//               onClick={() => setIsModalOpen(false)}
//             >
//               닫기
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageSlider;