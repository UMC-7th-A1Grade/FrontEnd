// import React, { useState, useEffect } from 'react';
// import styles from './FullPopup.module.css';
// import { mathService } from '../../../apis/mathApi';
// const FullPopup = ({ userQuestionId, onClose }) => {
//   const [activeTab, setActiveTab] = useState('memo');
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [showSkeleton, setShowSkeleton] = useState(true);
//   const [questionData, setQuestionData] = useState({
//     questionImg: '',
//     answer: '',
//     memo: '',
//     noteUrls: []
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadQuestionData = async () => {
//       try {
//         const data = await mathService.getQuestionData(userQuestionId);
//         setQuestionData(data);
//       } catch (error) {
//         setError(error.message);
//         console.error('Failed to load question data:', error);
//       }
//     };
//     loadQuestionData();
//   }, [userQuestionId]);

//   useEffect(() => {
//     setShowSkeleton(true);
//     setImageLoaded(false);

//     const timer = setTimeout(() => {
//       setShowSkeleton(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [activeTab]);

//   const handleImageLoad = () => {
//     setTimeout(() => {
//       setImageLoaded(true);
//     }, 300);
//   };

//   const getContent = () => {
//     if (activeTab === 'memo') {
//       return (
//         <img
//           src={questionData.memo || questionData.questionImg}
//           alt="메모 이미지"
//           className={`${styles.problem_image} ${imageLoaded ? styles.loaded : ''}`}
//           onLoad={handleImageLoad}
//         />
//       );
//     } else {
//       if (!questionData.noteUrls || questionData.noteUrls.length === 0) {
//         return <div className={styles.no_note}>필기가 없습니다</div>;
//       }
//       return (
//         <img
//           src={questionData.noteUrls[0]}
//           alt="필기 이미지"
//           className={`${styles.problem_image} ${imageLoaded ? styles.loaded : ''}`}
//           onLoad={handleImageLoad}
//         />
//       );
//     }
//   };

//   if (error) {
//     return (
//       <div className={styles.overlay}>
//         <div className={styles.error}>
//           {error}
//           <button onClick={onClose}>닫기</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <div className={styles.problem_number}>
//             <span>{questionData.answer || '...'}</span>
//           </div>

//           <button
//             className={styles.close_button}
//             onClick={onClose}
//           >
//             <img
//               src="/images/home/X_button.png"
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
//             {showSkeleton && <div className={styles.skeleton} />}
//             {getContent()}
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionData, setQuestionData] = useState({
    questionImg: '',
    answer: '',
    memo: '',
    note: []
  });

  useEffect(() => {
    const loadQuestionData = async () => {
      if (!userQuestionId || isNaN(Number(userQuestionId))) {
        setError('유효한 문제 ID가 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await mathService.getQuestionData(Number(userQuestionId));
        setQuestionData({
          questionImg: data.questionImg || '',
          answer: data.answer || '',
          memo: data.memo || '',
          note: Array.isArray(data.note) ? data.note : []
        });
      } catch (error) {
        setError(error.message);
        console.error('Question data loading error:', error);
        if (error.details) {
          console.error('Error details:', error.details);
        }
      } finally {
        setLoading(false);
      }
    };

    loadQuestionData();
  }, [userQuestionId]);

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

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.loading}>데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.overlay}>
        <div className={styles.error}>
          <div className={styles.errorMessage}>{error}</div>
          <button 
            onClick={onClose}
            className={styles.closeButton}
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

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
      if (!questionData.note || questionData.note.length === 0) {
        return <div className={styles.no_note}>필기가 없습니다</div>;
      }
      return (
        <img
          src={questionData.note[0]}
          alt="필기 이미지"
          className={`${styles.problem_image} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={handleImageLoad}
        />
      );
    }
  };

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
              src="/images/home/X_button.png"
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