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
// import { getRecentQuestions } from '../apis/questionApi';
// import logoNickname from '../assets/images/nickname/Logo_Nickname.png';

// const HomePage = () => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [userNickname, setUserNickname] = useState('사용자');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showFullPopup, setShowFullPopup] = useState(false);

//   // 최근 문제 이미지 불러오기
//   useEffect(() => {
//     const fetchRecentQuestions = async () => {
//       try {
//         setIsLoading(true);
//         const questions = await getRecentQuestions();
//         setImages(questions.map(question => question.questionImg));
//       } catch (error) {
//         console.error('Failed to fetch recent questions:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRecentQuestions();
//   }, []);

//   // 닉네임 불러오기
//   useEffect(() => {
//     const storedNickname = localStorage.getItem('userNickname');
//     if (storedNickname) {
//       setUserNickname(storedNickname);
//     }
//   }, []);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleImageClick = (imageUrl, index) => {
//     setSelectedImage({ url: imageUrl, index });
//   };

//   const handleShowFullPopup = () => {
//     setShowFullPopup(true);
//   };

//   const handleClosePopup = () => {
//     setSelectedImage(null);
//     setShowFullPopup(false);
//   };

//   return (
//     <main className={styles.layout}>
//       <header className={styles.layout__header}>
//         <img
//           src={logoNickname}
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
//             images={images}
//             isLoading={isLoading}
//           />
//         </article>

//         <nav className={styles.layout__slide_circle}>
//           <SlideCircle
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//             totalImages={images.length}
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
import { getRecentQuestions } from '../apis/questionApi';
import logoNickname from '../assets/images/nickname/Logo_Nickname.png';
import api from '../apis/axios';

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [userNickname, setUserNickname] = useState('사용자');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFullPopup, setShowFullPopup] = useState(false);

  // 최근 문제 이미지 불러오기
  useEffect(() => {
    const fetchRecentQuestions = async () => {
      try {
        setIsLoading(true);
        const questions = await getRecentQuestions();
        setImages(questions.map(question => question.questionImg));
      } catch (error) {
        console.error('Failed to fetch recent questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentQuestions();
  }, []);

  // 닉네임 불러오기
  useEffect(() => {
    const fetchNickname = async () => {
      // 디버깅: 환경 변수 확인
      console.log('=== 환경 변수 디버깅 ===');
      console.log('VITE_SERVER_URL:', import.meta.env.VITE_SERVER_URL);
      
      // 디버깅: 로컬 스토리지 토큰 확인
      const token = localStorage.getItem('token');
      console.log('=== 토큰 상태 디버깅 ===');
      console.log('토큰 상태:', token ? '존재' : '없음');
      
      if (!token) {
        console.warn('로컬 스토리지에 토큰이 없습니다.');
      }

      try {
        // 디버깅: API 요청 정보
        console.log('=== 요청 디버깅 정보 ===');
        console.log('기본 URL:', api.defaults.baseURL);
        console.log('요청 경로:', '/api/users/nickname');
        console.log('요청 헤더:', {
          'Content-Type': api.defaults.headers['Content-Type'],
          'Authorization': token ? `Bearer ${token}` : '없음'
        });

        const response = await api.get('/api/users/nickname');
        
        // 디버깅: API 응답 정보
        console.log('=== 응답 디버깅 정보 ===');
        console.log('응답 상태:', response.status);
        console.log('응답 데이터:', response.data);

        if (response.data && response.data.nickname) {
          setUserNickname(response.data.nickname);
        } else {
          console.error('유효하지 않은 응답 구조:', response.data);
          throw new Error('Invalid API response structure');
        }

      } catch (error) {
        // 디버깅: 에러 정보 상세 로깅
        console.error('=== 에러 디버깅 정보 ===');
        if (error.response) {
          console.error('서버 응답 에러:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
        } else if (error.request) {
          console.error('요청 실패 (응답 없음):', error.request);
        } else {
          console.error('요청 설정 중 에러:', error.message);
        }
        console.error('에러 설정:', error.config);

        // 폴백: localStorage 사용
        const storedNickname = localStorage.getItem('userNickname');
        if (storedNickname) {
          console.log('로컬 스토리지에서 닉네임 복구:', storedNickname);
          setUserNickname(storedNickname);
        }
      }
    };

    fetchNickname();
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
            isLoading={isLoading}
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