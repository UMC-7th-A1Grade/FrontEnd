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
// import { getRecentQuestions } from '../apis/questionApi';
// import { getUserNickname } from '../apis/userApi';
// import logoNickname from '../assets/images/nickname/Logo_Nickname.png';
// import ChatbotButton from '../components/HomePage/ChatBotButton/ChatBotButton';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [userNickname, setUserNickname] = useState('사용자');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showFullPopup, setShowFullPopup] = useState(false);
//   const [isError, setIsError] = useState(false);

//   // 초기 로그인 체크
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) {
//       localStorage.clear(); // 다른 데이터도 모두 삭제
//       navigate('/login');
//       return;
//     }

//     // 닉네임 즉시 체크
//     const checkAuth = async () => {
//       try {
//         const { nickname, isSuccess } = await getUserNickname();
//         if (!isSuccess) {
//           throw new Error('Auth failed');
//         }
//         setUserNickname(nickname);
//         localStorage.setItem('userNickname', nickname);
//       } catch (error) {
//         console.error('Authentication failed:', error);
//         // 401이나 404 등 인증 관련 에러가 발생하면 로그인 페이지로 이동
//         if (error.response?.status === 401 || error.response?.status === 404) {
//           localStorage.clear(); // 인증 실패시 모든 데이터 삭제
//           navigate('/login');
//           return;
//         }
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   // 최근 문제 불러오기
//   useEffect(() => {
//     const fetchRecentQuestions = async () => {
//       try {
//         setIsLoading(true);
//         const questions = await getRecentQuestions();
//         setQuestions(questions);
//         setIsError(false);
//       } catch (error) {
//         console.error('최근 문제 조회 실패:', error);
//         setIsError(true);
//         if (error.response?.status === 401 || error.response?.status === 404) {
//           localStorage.clear(); // 인증 실패시 모든 데이터 삭제
//           navigate('/login');
//           return;
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRecentQuestions();
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
import { getRecentQuestions } from '../apis/questionApi';
import { getUserNickname } from '../apis/userApi';
import logoNickname from '../assets/images/nickname/Logo_Nickname.png';
import ChatbotButton from '../components/HomePage/ChatBotButton/ChatBotButton';

// 더미 데이터 추가
const dummyQuestions = [
  {
    id: 1,
    questionImg: 'src/assets/images/home/math_1.png',
    title: '2023 수능 수학 가형 21번',
    content: '수열의 극한과 연속의 문제',
    answer: '3',
    explanation: '수열의 극한값을 구하고 연속성을 확인하는 문제입니다...',
    date: '2024-02-20',
    isSolved: true
  },
  {
    id: 2,
    questionImg: 'src/assets/images/home/math_1.png',
    title: '2024 수능특강 미적분 138쪽 3번',
    content: '삼각함수의 덧셈정리',
    answer: '5',
    explanation: '삼각함수의 덧셈정리를 이용하여 해결하는 문제입니다...',
    date: '2024-02-19',
    isSolved: false
  },
  {
    id: 3,
    questionImg: 'src/assets/images/home/math_1.png',
    title: '2023 수능완성 확률과 통계 56쪽 12번',
    content: '이항분포와 정규분포',
    answer: '2',
    explanation: '이항분포를 정규분포로 근사하여 해결하는 문제입니다...',
    date: '2024-02-18',
    isSolved: true
  },
  {
    id: 4,
    questionImg: 'src/assets/images/home/math_1.png',
    title: '2024 수능특강 기하 92쪽 5번',
    content: '공간벡터와 정사영',
    answer: '4',
    explanation: '공간벡터의 내적과 정사영을 이용하여 해결하는 문제입니다...',
    date: '2024-02-17',
    isSolved: true
  },
  {
    id: 5,
    questionImg: 'src/assets/images/home/math_1.png',
    title: '2023 수능 수학 나형 15번',
    content: '함수의 미분과 극대극소',
    answer: '1',
    explanation: '함수의 미분을 통해 극대극소를 판별하는 문제입니다...',
    date: '2024-02-16',
    isSolved: false
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(dummyQuestions); // 더미 데이터로 초기화
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [userNickname, setUserNickname] = useState('테스트 사용자'); // 더미 닉네임
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFullPopup, setShowFullPopup] = useState(false);
  const [isError, setIsError] = useState(false);

  // 초기 로그인 체크
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // 개발 중에는 주석 처리하여 로그인 체크 스킵
      // localStorage.clear();
      // navigate('/login');
      // return;
    }

    // 닉네임 체크 (개발 중에는 더미 데이터 사용)
    const checkAuth = async () => {
      try {
        // 실제 API 호출 대신 더미 데이터 사용
        setUserNickname('테스트 사용자');
        localStorage.setItem('userNickname', '테스트 사용자');
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };

    checkAuth();
  }, [navigate]);

  // 최근 문제 불러오기 (개발 중에는 더미 데이터 사용)
  useEffect(() => {
    const fetchRecentQuestions = async () => {
      try {
        setIsLoading(true);
        // 실제 API 호출 대신 더미 데이터 사용
        setTimeout(() => {
          setQuestions(dummyQuestions);
          setIsLoading(false);
          setIsError(false);
        }, 1000); // 로딩 시뮬레이션
      } catch (error) {
        console.error('최근 문제 조회 실패:', error);
        setIsError(true);
      }
    };

    fetchRecentQuestions();
  }, []);

  // 나머지 코드는 동일
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
      {/* 기존 JSX 코드와 동일 */}
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