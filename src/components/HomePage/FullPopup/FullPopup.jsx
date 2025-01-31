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

// FullPopup.jsx
import React, { useState, useEffect } from 'react';
import styles from './FullPopup.module.css';

const FullPopup = ({ image, onClose }) => {
  const [activeTab, setActiveTab] = useState('memo');
  
  // 추후 API 연동 시 사용할 상태
  // const [problemData, setProblemData] = useState({
  //   problemNumber: '25',
  //   memoImage: null,
  //   noteImage: null
  // });
  
  // useEffect(() => {
  //   const fetchProblemData = async () => {
  //     try {
  //       const response = await fetch(`/api/problem/${image.problemId}`);
  //       const data = await response.json();
  //       setProblemData({
  //         problemNumber: data.problemNumber,
  //         memoImage: data.memoImage,
  //         noteImage: data.noteImage
  //       });
  //     } catch (error) {
  //       console.error('Failed to fetch problem data:', error);
  //     }
  //   };
  //   fetchProblemData();
  // }, [image.problemId]);

  // 임시 문제 번호
  const problemNumber = '25';

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.problem_number}>
            <span>{problemNumber}</span>
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
            <img 
              src={image.url}
              alt={activeTab === 'memo' ? '메모 이미지' : '필기 이미지'}
              className={styles.problem_image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPopup;