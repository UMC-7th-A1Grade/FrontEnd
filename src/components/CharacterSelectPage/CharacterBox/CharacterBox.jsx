import React from 'react';
import styles from './CharacterBox.module.css';
import selectedIcon from '../../../assets/images/characterSelectPage/Logo_character.svg';
import character1 from '../../../assets/images/characterSelectPage/character_1.svg';
import character2 from '../../../assets/images/characterSelectPage/character_2.svg';
import character3 from '../../../assets/images/characterSelectPage/character_3.svg';
import character4 from '../../../assets/images/characterSelectPage/character_4.svg';
import character5 from '../../../assets/images/characterSelectPage/character_5.svg';
import character6 from '../../../assets/images/characterSelectPage/character_6.svg';
import character7 from '../../../assets/images/characterSelectPage/character_7.svg';
import character8 from '../../../assets/images/characterSelectPage/character_8.svg';
import character9 from '../../../assets/images/characterSelectPage/character_9.svg';
import character10 from '../../../assets/images/characterSelectPage/character_10.svg';
import character11 from '../../../assets/images/characterSelectPage/character_11.svg';
import character12 from '../../../assets/images/characterSelectPage/character_12.svg';

const CharacterBox = ({ onSelect, selected }) => {
  const characters = [
    { id: 1, image: character1 },
    { id: 2, image: character2 },
    { id: 3, image: character3 },
    { id: 4, image: character4 },
    { id: 5, image: character5 },
    { id: 6, image: character6 },
    { id: 7, image: character7 },
    { id: 8, image: character8 },
    { id: 9, image: character9 },
    { id: 10, image: character10 },
    { id: 11, image: character11 },
    { id: 12, image: character12 }
  ];

  const handleCharacterClick = (id) => {
    onSelect(id);
    console.log('Selected character ID:', id);

    // 백엔드 전송 로직 (주석 처리)
    // const sendCharacterToBackend = async () => {
    //   try {
    //     const response = await fetch('/api/select-character', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //       },
    //       body: JSON.stringify({ characterId: id })
    //     });

    //     if (!response.ok) {
    //       throw new Error('Character selection failed');
    //     }

    //     const data = await response.json();
    //     console.log('Backend response:', data);
    //   } catch (error) {
    //     console.error('Error selecting character:', error);
    //   }
    // };

    // sendCharacterToBackend();
  };

  return (
    <div className={styles.container}>
      {characters.map((char) => (
        <button
          key={char.id}
          className={`${styles.characterButton} ${selected === char.id ? styles.selected : ''}`}
          onClick={() => handleCharacterClick(char.id)}
        >
          <img src={char.image} alt={`Character ${char.id}`} className={styles.characterImage} />
          {selected === char.id && (
            <img src={selectedIcon} alt="Selected" className={styles.selectedIcon} />
          )}
        </button>
      ))}
    </div>
  );
};

export default CharacterBox;