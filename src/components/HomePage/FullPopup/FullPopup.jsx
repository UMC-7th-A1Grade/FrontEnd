// import React, { useState, useEffect } from 'react';
// import styles from './FullPopup.module.css';

// const FullPopup = ({ image, onClose }) => {
//   const [activeTab, setActiveTab] = useState('memo');
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [showSkeleton, setShowSkeleton] = useState(true);

//   useEffect(() => {
//     setShowSkeleton(true);
//     setImageLoaded(false);

//     const timer = setTimeout(() => {
//       setShowSkeleton(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, [activeTab]);

//   const handleImageLoad = () => {
//     setTimeout(() => {
//       setImageLoaded(true);
//     }, 1000); // 1초 후 이미지 표시
//   };

//   // 🔹 로딩 전에는 SmallPopup의 이미지 유지, 이후 메모/필기 이미지로 변경
//   const imageUrl = imageLoaded
//     ? activeTab === 'memo'
//       ? image.memoUrl || image.url // 메모 이미지가 없으면 기존 이미지 사용
//       : image.noteUrl || image.url // 필기 이미지가 없으면 기존 이미지 사용
//     : image.url; // 로딩 전에는 SmallPopup 이미지 유지

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
//               src="/src/assets/images/home/X_button.png" 
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
//           <div className={styles.image_container}>
//             {/* 🔹 스켈레톤 로딩 UI */}
//             {showSkeleton && <div className={styles.skeleton} />}

//             {/* 🔹 로딩 전에는 SmallPopup의 이미지 사용, 이후 필기/메모 이미지 적용 */}
//             <img 
//               src={imageUrl} 
//               alt={activeTab === 'memo' ? '메모 이미지' : '필기 이미지'}
//               className={`${styles.problem_image} ${imageLoaded ? styles.loaded : ''}`}
//               onLoad={handleImageLoad}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullPopup;

import React, { useState, useEffect } from 'react';
import styles from './FullPopup.module.css';
import { mathService } from '../../../apis/mathApi';

const FullPopup = ({ userQuestionId, onClose }) => {
  const [activeTab, setActiveTab] = useState('memo');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [questionData, setQuestionData] = useState({
    questionImg: '',
    answer: '',
    memo: '',
    noteUrls: []
  });
  const [error, setError] = useState(null);

  // 문제 데이터 로드
  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        const data = await mathService.getQuestionData(userQuestionId);
        setQuestionData(data);
      } catch (error) {
        setError(error.message);
        console.error('Failed to load question data:', error);
      }
    };
    loadQuestionData();
  }, [userQuestionId]);

  // 스켈레톤 UI와 이미지 로딩 처리
  useEffect(() => {
    setShowSkeleton(true);
    setImageLoaded(false);

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 300);
  };

  // 현재 탭에 따른 컨텐츠 반환
  const getContent = () => {
    if (activeTab === 'memo') {
      return (
        <img
          src={questionData.memo || questionData.questionImg}
          alt="메모 이미지"
          className={`${styles.problem_image} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={handleImageLoad}
        />
      );
    } else {
      // 필기 탭인 경우
      if (!questionData.noteUrls || questionData.noteUrls.length === 0) {
        return <div className={styles.no_note}>필기가 없습니다</div>;
      }
      return (
        <img
          src={questionData.noteUrls[0]}
          alt="필기 이미지"
          className={`${styles.problem_image} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={handleImageLoad}
        />
      );
    }
  };

  if (error) {
    return (
      <div className={styles.overlay}>
        <div className={styles.error}>
          {error}
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.problem_number}>
            <span>{questionData.answer || '...'}</span>
          </div>

          <button
            className={styles.close_button}
            onClick={onClose}
          >
            <img
              src="/src/assets/images/home/X_button.png"
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
            {showSkeleton && <div className={styles.skeleton} />}
            {getContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPopup;