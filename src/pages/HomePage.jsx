// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
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
// import ChatbotButton from '../components/HomePage/ChatBotButton/ChatBotButton';
// import { getRecentQuestions } from '../apis/questionApi';
// import { getUserNickname, getUserCredits } from '../apis/userApi';
// import logoNickname from '../assets/images/nickname/Logo_Nickname.png';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [userNickname, setUserNickname] = useState('사용자');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showFullPopup, setShowFullPopup] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const checkAuthAndLoadData = async () => {
//       try {
//         // 먼저 최근 문제 데이터 로드 시도
//         try {
//           const questionsData = await getRecentQuestions();
//           setQuestions(questionsData);
//           setIsError(false);
//         } catch (error) {
//           // recent API가 403 에러인 경우 추가 인증 체크 진행
//           if (error.response?.status === 403) {
//             // 닉네임과 크레딧 API 체크
//             const [nicknameResponse, creditResponse] = await Promise.allSettled([
//               getUserNickname(),
//               getUserCredits()
//             ]);

//             const isNicknameError = nicknameResponse.status === 'rejected';
//             const isCreditError = creditResponse.status === 'rejected';

//             // 두 API 모두 실패한 경우 로그인 페이지로 이동
//             if (isNicknameError && isCreditError) {
//               localStorage.clear();
//               navigate('/login', { replace: true });
//               return;
//             }
//           }
//           setIsError(true);
//         }

//         // 닉네임 가져오기 시도
//         try {
//           const { nickname, isSuccess } = await getUserNickname();
//           if (isSuccess && nickname) {
//             setUserNickname(nickname);
//           }
//         } catch (error) {
//           console.error('닉네임 로드 실패:', error);
//         }

//       } catch (error) {
//         console.error('데이터 로드 실패:', error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthAndLoadData();
//   }, [navigate]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleImageClick = (imageUrl, index) => {
//     const question = questions[index];
//     setSelectedImage({
//       url: question.questionImg,
//       index,
//       id: question.id
//     });
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
//             images={questions.map(q => q.questionImg)}
//             isLoading={isLoading}
//             isError={isError}
//           />
//         </article>

//         <nav className={styles.layout__slide_circle}>
//           <SlideCircle
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//             totalImages={questions.length}
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

//       <aside className={styles.layout__chatbotButton}>
//         <ChatbotButton />
//       </aside>

//       <aside className={styles.layout__CameraButton}>
//         <LinkCameraButton />
//       </aside>

//       <footer className={styles.layout__footer}>
//         <p className={styles.layout__representative}>대표자 : 이진동</p>
//         <Link 
//           to="/terms"
//           className={styles.layout__terms}
//         >
//           이용약관
//         </Link>
//         <Link 
//           to="/privacy"
//           className={styles.layout__privacy}
//         >
//           개인정보처리방침
//         </Link>
//       </footer>

//       {selectedImage && !showFullPopup && (
//         <SmallPopup
//           image={selectedImage}
//           onClose={handleClosePopup}
//           onShowFullPopup={handleShowFullPopup}
//         />
//       )}

//       {showFullPopup && selectedImage && (
//         <FullPopup
//           userQuestionId={selectedImage.id}
//           onClose={handleClosePopup}
//         />
//       )}
//     </main>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import ChatbotButton from '../components/HomePage/ChatBotButton/ChatBotButton';
import { getRecentQuestions } from '../apis/questionApi';
import { getUserNickname, getUserCredits } from '../apis/userApi';
import logoNickname from '../assets/images/nickname/Logo_Nickname.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [userNickname, setUserNickname] = useState('사용자');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFullPopup, setShowFullPopup] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        // 모든 API 호출을 동시에 실행
        const [questionsResponse, nicknameResponse, creditsResponse] = await Promise.allSettled([
          getRecentQuestions(),
          getUserNickname(),
          getUserCredits()
        ]);

        // 500 에러 카운트 확인
        const count500Errors = [questionsResponse, nicknameResponse, creditsResponse].filter(
          response => response.status === 'rejected' && response.reason?.response?.status === 500
        ).length;

        // 닉네임 로드 실패 확인
        const hasNicknameError = nicknameResponse.status === 'rejected' &&
          nicknameResponse.reason?.message === 'Request failed with status code 500';

        // 로그인 페이지로 리다이렉트 조건 체크
        if (count500Errors >= 2 || hasNicknameError) {
          console.log('인증 에러 발생: 로그인 페이지로 이동합니다.');
          localStorage.clear();
          navigate('/login', { replace: true });
          return;
        }

        // 데이터 설정
        if (questionsResponse.status === 'fulfilled') {
          setQuestions(questionsResponse.value);
          setIsError(false);
        } else {
          setIsError(true);
        }

        if (nicknameResponse.status === 'fulfilled') {
          const { nickname, isSuccess } = nicknameResponse.value;
          if (isSuccess && nickname) {
            setUserNickname(nickname);
          }
        }

      } catch (error) {
        console.error('데이터 로드 실패:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [navigate]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleImageClick = (imageUrl, index) => {
    const question = questions[index];
    setSelectedImage({
      url: question.questionImg,
      index,
      id: question.id
    });
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
            images={questions.map(q => q.questionImg)}
            isLoading={isLoading}
            isError={isError}
          />
        </article>

        <nav className={styles.layout__slide_circle}>
          <SlideCircle
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalImages={questions.length}
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

      <aside className={styles.layout__chatbotButton}>
        <ChatbotButton />
      </aside>

      <aside className={styles.layout__CameraButton}>
        <LinkCameraButton />
      </aside>

      <footer className={styles.layout__footer}>
        <p className={styles.layout__representative}>대표자 : 이진동</p>
        <Link 
          to="/terms"
          className={styles.layout__terms}
        >
          이용약관
        </Link>
        <Link 
          to="/privacy"
          className={styles.layout__privacy}
        >
          개인정보처리방침
        </Link>
      </footer>

      {selectedImage && !showFullPopup && (
        <SmallPopup
          image={selectedImage}
          onClose={handleClosePopup}
          onShowFullPopup={handleShowFullPopup}
        />
      )}

      {showFullPopup && selectedImage && (
        <FullPopup
          userQuestionId={selectedImage.id}
          onClose={handleClosePopup}
        />
      )}
    </main>
  );
};

export default HomePage;