import React, { useState, useEffect } from 'react';
import styles from '../../styles/HomePage/HomePage.module.css';
import ImageSlider from '../../components/HomePage/ImageSlider/ImageSlider';
import SemicircleMessage from '../../components/HomePage/SemicircleMessage/SemicircleMessage';
import SlideCircle from '../../components/HomePage/SlideCircle/SlideCircle';
import RandomQuestionButton from '../../components/HomePage/RandomQusetionButton/RandomQusetionButton';
import LinkMyPageButton from '../../components/HomePage/LinkMyPageButton/LinkMyPageButton';
import LinkStorageButton from '../../components/HomePage/LinkStorageButton/LinkStorageButton';
const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [userNickname, setUserNickname] = useState('홍길동');

  // 실제 API 연동 시 사용할 useEffect
  // useEffect(() => {
  //   const fetchUserNickname = async () => {
  //     try {
  //       const response = await fetch('/api/user/nickname');
  //       const data = await response.json();
  //       setUserNickname(data.nickname);
  //     } catch (error) {
  //       console.error('Failed to fetch user nickname:', error);
  //     }
  //   };
  //   fetchUserNickname();
  // }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className={styles.layout}>
      <header className={styles.layout__header}>
        <img
          src="/src/assets/images/Logo/Logo_Nickname.svg"
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
          />
        </article>

        <nav className={styles.layout__slide_circle}>
          <SlideCircle
            currentPage={currentPage}
            onPageChange={handlePageChange}
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
    </main>
  );
};

export default HomePage;