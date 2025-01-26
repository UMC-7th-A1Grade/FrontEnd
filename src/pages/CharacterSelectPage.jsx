import React, { useState, useEffect } from 'react';
import CharacterBox from '../components/CharacterSelectPage/CharacterBox/CharacterBox';
import CharacterButton from '../components/CharacterSelectPage/CharacterButton/CharacterButton';
import styles from '../styles/CharacterSelectPage/CharacterSelectPage.module.css';

const CharacterSelectPage = () => {
  const [userName, setUserName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    setUserName('홍길동');
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.userName}>{`${userName}님`}</div>
         <div className={styles.subtext}> 캐릭터를 선택해주세요!
         </div>
        <div className={styles.characterGridContainer}>
          
          <CharacterBox onSelect={setSelectedCharacter} selected={selectedCharacter} />
        </div>
        <div className={styles.buttonWrapper}>
          <CharacterButton isSelected={selectedCharacter !== null} />
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectPage;