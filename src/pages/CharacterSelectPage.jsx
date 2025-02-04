// import React, { useState, useEffect } from 'react';
// import CharacterBox from '../components/CharacterSelectPage/CharacterBox/CharacterBox';
// import CharacterButton from '../components/CharacterSelectPage/CharacterButton/CharacterButton';
// import styles from '../styles/CharacterSelectPage/CharacterSelectPage.module.css';

// const CharacterSelectPage = () => {
//   const [userName, setUserName] = useState('');
//   const [selectedCharacter, setSelectedCharacter] = useState(null);

//   useEffect(() => {
//     const savedNickname = localStorage.getItem('tempNickname');
//     if (savedNickname) {
//       setUserName(savedNickname);
//     }
//   }, []);

//   return (
//     <div className={styles.pageContainer}>
//       <div className={styles.contentWrapper}>
//         <div className={styles.userName}>{`${userName}님`}</div>
//         <div className={styles.subtext}>캐릭터를 선택해주세요!</div>
//         <div className={styles.characterGridContainer}>
//           <CharacterBox 
//             onSelect={setSelectedCharacter} 
//             selected={selectedCharacter} 
//           />
//         </div>
//         <div className={styles.buttonWrapper}>
//           <CharacterButton 
//             isSelected={selectedCharacter !== null} 
//             selectedCharacter={selectedCharacter}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CharacterSelectPage;

import React, { useState, useEffect } from 'react';
import CharacterBox from '../components/CharacterSelectPage/CharacterBox/CharacterBox';
import CharacterButton from '../components/CharacterSelectPage/CharacterButton/CharacterButton';
import api from '../apis/axios';
import styles from '../styles/CharacterSelectPage/CharacterSelectPage.module.css';

const CharacterSelectPage = () => {
  const [userName, setUserName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedNickname = localStorage.getItem('tempNickname');
    if (savedNickname) {
      setUserName(savedNickname);
    }

    const fetchCharacters = async () => {
      try {
        const response = await api.get('/api/characters');
        if (response.data.isSuccess) {
          setCharacters(response.data.result.characters);
        }
      } catch (error) {
        console.error('캐릭터 정보 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.userName}>{`${userName}님`}</div>
        <div className={styles.subtext}>캐릭터를 선택해주세요!</div>
        <div className={styles.characterGridContainer}>
          <CharacterBox 
            onSelect={setSelectedCharacter} 
            selected={selectedCharacter}
            characters={characters}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <CharacterButton 
            isSelected={selectedCharacter !== null} 
            selectedCharacter={selectedCharacter}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectPage;