// import React, { useState } from 'react';
// import styles from './FullPopup.module.css';

// const FullPopup = ({ image, onClose }) => {
//   const [activeTab, setActiveTab] = useState('memo');
  
//   // 추후 API 연동 시 사용할 상태
//   // const [memoImage, setMemoImage] = useState(null);
//   // const [noteImage, setNoteImage] = useState(null);
  
//   // useEffect(() => {
//   //   const fetchImages = async () => {
//   //     try {
//   //       const response = await fetch(`/api/problem/${problemId}`);
//   //       const data = await response.json();
//   //       setMemoImage(data.memoImage);
//   //       setNoteImage(data.noteImage);
//   //     } catch (error) {
//   //       console.error('Failed to fetch images:', error);
//   //     }
//   //   };
//   //   fetchImages();
//   // }, [problemId]);

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <div className={styles.problem_number}>
//             <span>25</span>
//           </div>
          
//           <button 
//             className={styles.close_button}
//             onClick={onClose}
//           >
//             <img 
//               src="/src/assets/images/home/X_button.svg" 
//               alt="닫기"
//             />
//           </button>
          
//           <div className={styles.toggle_buttons}>
//             <button 
//               className={`${styles.toggle_button} ${activeTab === 'memo' ? styles.active : ''}`}
//               onClick={() => setActiveTab('memo')}
//             >
//               메모
//             </button>
//             <button 
//               className={`${styles.toggle_button} ${activeTab === 'note' ? styles.active : ''}`}
//               onClick={() => setActiveTab('note')}
//             >
//               필기
//             </button>
//           </div>
//         </div>

//         <div className={styles.content}>
//           <img 
//             src={image.url}
//             alt={activeTab === 'memo' ? '메모 이미지' : '필기 이미지'}
//             className={styles.problem_image}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullPopup;



import React, { useState, useEffect } from 'react';
import styles from './FullPopup.module.css';

const FullPopup = ({ image, onClose }) => {
  const [activeTab, setActiveTab] = useState('memo');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // 탭 변경 시 스켈레톤 다시 표시
    setShowSkeleton(true);
    setImageLoaded(false);

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 1000); // 1초 후 이미지 표시
  };

  // 🔹 로딩 전에는 SmallPopup의 이미지 유지, 이후 메모/필기 이미지로 변경
  const imageUrl = imageLoaded
    ? activeTab === 'memo'
      ? image.memoUrl || image.url // 메모 이미지가 없으면 기존 이미지 사용
      : image.noteUrl || image.url // 필기 이미지가 없으면 기존 이미지 사용
    : image.url; // 로딩 전에는 SmallPopup 이미지 유지

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.problem_number}>
            <span>25</span>
          </div>

          <button 
            className={styles.close_button}
            onClick={onClose}
          >
            <img 
              src="/src/assets/images/home/X_button.svg" 
              alt="닫기"
            />
          </button>

          <div className={styles.toggle_buttons}>
            <button 
              className={`${styles.toggle_button} ${activeTab === 'memo' ? styles.active : ''}`}
              onClick={() => setActiveTab('memo')}
            >
              메모
            </button>
            <button 
              className={`${styles.toggle_button} ${activeTab === 'note' ? styles.active : ''}`}
              onClick={() => setActiveTab('note')}
            >
              필기
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.image_container}>
            {/* 🔹 스켈레톤 로딩 UI */}
            {showSkeleton && <div className={styles.skeleton} />}

            {/* 🔹 로딩 전에는 SmallPopup의 이미지 사용, 이후 필기/메모 이미지 적용 */}
            <img 
              src={imageUrl} 
              alt={activeTab === 'memo' ? '메모 이미지' : '필기 이미지'}
              className={`${styles.problem_image} ${imageLoaded ? styles.loaded : ''}`}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPopup;
