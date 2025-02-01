// API 연결 진행중 

// import React, { useState, useEffect } from 'react';
// import styles from '../styles/HomePage/HomePage.module.css';
// import ImageSlider from '../components/HomePage/ImageSlider/ImageSlider';
// import SmallPopup from '../components/HomePage/SmallPopup/SmallPopup';
// import FullPopup from '../components/HomePage/FullPopup/FullPopup';
// import SemicircleMessage from '../components/HomePage/SemicircleMessage/SemicircleMessage';
// import SlideCircle from '../components/HomePage/SlideCircle/SlideCircle';
// import RandomQuestionButton from '../components/HomePage/RandomQusetionButton/RandomQusetionButton';
// import LinkMyPageButton from '../components/HomePage/LinkMyPageButton/LinkMyPageButton';
// import LinkStorageButton from '../components/HomePage/LinkStorageButton/LinkStorageButton';
// import CreditButton from '../components/HomePage/CreditButton/CreditButton';
// import LinkCameraButton from '../components/HomePage/LinkCameraButton/LinkCameraButton';

// const HomePage = () => {
//   // 상태 관리
//   const [currentPage, setCurrentPage] = useState(2);
//   const [userNickname, setUserNickname] = useState('사용자');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showFullPopup, setShowFullPopup] = useState(false);

//   // localStorage에서 사용자 정보 가져오기
//   useEffect(() => {
//     const storedNickname = localStorage.getItem('userNickname');
//     if (storedNickname) {
//       setUserNickname(storedNickname);
//     }
//   }, []);

//   // 페이지 변경 핸들러
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   // 이미지 클릭 핸들러
//   const handleImageClick = (imageUrl, index) => {
//     setSelectedImage({ url: imageUrl, index });
//   };

//   // 풀팝업 표시 핸들러
//   const handleShowFullPopup = () => {
//     setShowFullPopup(true);
//   };

//   // 팝업 닫기 핸들러
//   const handleClosePopup = () => {
//     setSelectedImage(null);
//     setShowFullPopup(false);
//   };

//   return (
//     <main className={styles.layout}>
//       <header className={styles.layout__header}>
//         <img
//           src="/src/assets/images/nickname/Logo_Nickname.svg"
//           alt="Logo"
//           className={styles.layout__logo}
//         />
//       </header>

//       <section className={styles.layout__welcome}>
//         <h1 className={styles.layout__greeting}>
//           안녕하세요 {userNickname}님
//         </h1>
//         <p className={styles.layout__subtext}>
//           오늘도 점수 올릴 준비가 되셨나요?
//         </p>
//       </section>

//       <section className={styles.layout__message} aria-label="메시지 섹션">
//         <SemicircleMessage />
//       </section>

//       <section className={styles.layout__content} aria-label="슬라이더 섹션">
//         <article className={styles.layout__slider}>
//           <ImageSlider
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//             onImageClick={handleImageClick}
//           />
//         </article>

//         <nav className={styles.layout__slide_circle}>
//           <SlideCircle
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </nav>
//       </section>

//       <aside className={styles.layout__random_button}>
//         <RandomQuestionButton />
//         <p className={styles.review_text}>
//           문제를 클릭해서 나의 복습을 확인해보세요!
//         </p>
//       </aside>

//       <aside className={styles.layout__myButton}>
//         <LinkMyPageButton />
//       </aside>

//       <aside className={styles.layout__storagebutton}>
//         <LinkStorageButton />
//       </aside>

//       <aside className={styles.layout__creditButton}>
//         <CreditButton />
//       </aside>

//       <aside className={styles.layout__CameraButton}>
//         <LinkCameraButton />
//       </aside>

//       {/* 조건부 렌더링으로 팝업 표시 */}
//       {selectedImage && !showFullPopup && (
//         <SmallPopup
//           image={selectedImage}
//           onClose={handleClosePopup}
//           onShowFullPopup={handleShowFullPopup}
//         />
//       )}

//       {showFullPopup && selectedImage && (
//         <FullPopup
//           image={selectedImage}
//           onClose={handleClosePopup}
//         />
//       )}
//     </main>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from 'react';
import styles from '../styles/HomePage/HomePage.module.css';
import ImageSlider from '../components/HomePage/ImageSlider/ImageSlider';
import SmallPopup from '../components/HomePage/SmallPopup/SmallPopup';
import FullPopup from '../components/HomePage/FullPopup/FullPopup';
import SemicircleMessage from '../components/HomePage/SemicircleMessage/SemicircleMessage';
import SlideCircle from '../components/HomePage/SlideCircle/SlideCircle';
import RandomQuestionButton from '../components/HomePage/RandomQusetionButton/RandomQusetionButton';
import LinkMyPageButton from '../components/HomePage/LinkMyPageButton/LinkMyPageButton';
import LinkStorageButton from '../components/HomePage/LinkStorageButton/LinkStorageButton';
import CreditButton from '../components/HomePage/CreditButton/CreditButton';
import LinkCameraButton from '../components/HomePage/LinkCameraButton/LinkCameraButton';

// 이미지 import - 상대 경로 사용
import math1 from '../assets/images/home/math_1.png';
import math2 from '../assets/images/home/math_2.png';
import math3 from '../assets/images/home/math_3.png';
import math4 from '../assets/images/home/math_4.png';
import math5 from '../assets/images/home/math_5.png';
import logoNickname from '../assets/images/nickname/Logo_Nickname.png';

const HomePage = () => {
  // 이미지 데이터 상태
  const [images] = useState([
    math1,
    math2,
    math3,
    math4,
    math5
  ]);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [userNickname, setUserNickname] = useState('사용자');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFullPopup, setShowFullPopup] = useState(false);

  useEffect(() => {
    const storedNickname = localStorage.getItem('userNickname');
    if (storedNickname) {
      setUserNickname(storedNickname);
    }
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleImageClick = (imageUrl, index) => {
    setSelectedImage({ url: imageUrl, index });
  };

  const handleShowFullPopup = () => {
    setShowFullPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
    setShowFullPopup(false);
  };

  return (
    <main className={styles.layout}>
      <header className={styles.layout__header}>
        <img
          src={logoNickname}
          alt="Logo"
          className={styles.layout__logo}
        />
      </header>

      <section className={styles.layout__welcome}>
        <h1 className={styles.layout__greeting}>
          안녕하세요 {userNickname}님
        </h1>
        <p className={styles.layout__subtext}>
          오늘도 점수 올릴 준비가 되셨나요?
        </p>
      </section>

      <section className={styles.layout__message} aria-label="메시지 섹션">
        <SemicircleMessage />
      </section>

      <section className={styles.layout__content} aria-label="슬라이더 섹션">
        <article className={styles.layout__slider}>
          <ImageSlider
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onImageClick={handleImageClick}
            images={images}
          />
        </article>

        <nav className={styles.layout__slide_circle}>
          <SlideCircle
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalImages={images.length}
          />
        </nav>
      </section>

      <aside className={styles.layout__random_button}>
        <RandomQuestionButton />
        <p className={styles.review_text}>
          문제를 클릭해서 나의 복습을 확인해보세요!
        </p>
      </aside>

      <aside className={styles.layout__myButton}>
        <LinkMyPageButton />
      </aside>

      <aside className={styles.layout__storagebutton}>
        <LinkStorageButton />
      </aside>

      <aside className={styles.layout__creditButton}>
        <CreditButton />
      </aside>

      <aside className={styles.layout__CameraButton}>
        <LinkCameraButton />
      </aside>

      {selectedImage && !showFullPopup && (
        <SmallPopup
          image={selectedImage}
          onClose={handleClosePopup}
          onShowFullPopup={handleShowFullPopup}
        />
      )}

      {showFullPopup && selectedImage && (
        <FullPopup
          image={selectedImage}
          onClose={handleClosePopup}
        />
      )}
    </main>
  );
};

export default HomePage;