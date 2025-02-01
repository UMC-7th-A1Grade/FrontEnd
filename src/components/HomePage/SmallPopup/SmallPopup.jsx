// // SmallPopup.jsx
// import React from 'react';
// import styles from './SmallPopup.module.css';

// const SmallPopup = ({ image, onClose, onShowFullPopup }) => {
//   const handleContainerClick = (e) => {
//     if (!e.target.closest(`.${styles.close}`)) {
//       onShowFullPopup();
//     }
//   };

//   return (
//     <div className={styles.overlay}>
//       <div 
//         className={styles.container} 
//         onClick={handleContainerClick}
//       >
//         <p className={styles.guide_text}>
//           문제를 터치하시면, 문제와 풀이도 볼 수 있어요!
//         </p>
//         <button 
//           className={styles.close}
//           onClick={(e) => {
//             e.stopPropagation();
//             onClose();
//           }}
//         >
//           <img 
//             src="/src/assets/images/home/X_button.svg" 
//             alt="닫기"
//           />
//         </button>
//         <img 
//           src={image.url} 
//           alt={`슬라이드 이미지 ${image.index + 1}`}
//           className={styles.image}
//         />
//       </div>
//     </div>
//   );
// };

// export default SmallPopup;

// import React, { useState } from 'react';
// import styles from './SmallPopup.module.css';

// const SmallPopup = ({ image, onClose, onShowFullPopup }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
  
//   const handleContainerClick = (e) => {
//     if (!e.target.closest(`.${styles.close}`)) {
//       onShowFullPopup();
//     }
//   };
  
//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   return (
//     <div className={styles.overlay}>
//       <div 
//         className={styles.container}
//         onClick={handleContainerClick}
//       >
//         <p className={styles.guide_text}>
//           문제를 터치하시면, 문제와 풀이도 볼 수 있어요!
//         </p>
        
//         <button
//           className={styles.close}
//           onClick={(e) => {
//             e.stopPropagation();
//             onClose();
//           }}
//         >
//           <img
//             src="/src/assets/images/home/X_button.svg"
//             alt="닫기"
//             className={styles.close_img}
//           />
//         </button>

//         {!imageLoaded && (
//           <div className={styles.skeleton} />
//         )}

//         <img
//           src={image.url}
//           alt={`슬라이드 이미지 ${image.index + 1}`}
//           className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
//           onLoad={handleImageLoad}
//         />
//       </div>
//     </div>
//   );
// };

// export default SmallPopup;



import React, { useState, useEffect } from 'react';
import styles from './SmallPopup.module.css';

const SmallPopup = ({ image, onClose, onShowFullPopup }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // 최소 1.5초 동안 스켈레톤 유지
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleContainerClick = (e) => {
    if (!e.target.closest(`.${styles.close}`)) {
      onShowFullPopup();
    }
  };
  
  const handleImageLoad = () => {
    // 1초 추가 지연 후 이미지 표시
    setTimeout(() => {
      setImageLoaded(true);
    }, 1000);
  };

  return (
    <div className={styles.overlay}>
      <div 
        className={styles.container}
        onClick={handleContainerClick}
      >
        <p className={styles.guide_text}>
          문제를 터치하시면, 문제와 풀이도 볼 수 있어요!
        </p>
        
        <button
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <img
            src="/src/assets/images/home/X_button.svg"
            alt="닫기"
            className={styles.close_img}
          />
        </button>

        {showSkeleton && <div className={styles.skeleton} />}

        <img
          src={image.url}
          alt={`슬라이드 이미지 ${image.index + 1}`}
          className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default SmallPopup;
