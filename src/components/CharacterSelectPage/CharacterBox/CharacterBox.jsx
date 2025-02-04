import React from 'react';
import styles from './CharacterBox.module.css';
import selectedIcon from '../../../assets/images/characterSelectPage/Logo_character.png';

const CharacterBox = ({ onSelect, selected, characters, isLoading }) => {
  const handleCharacterClick = (id) => {
    onSelect(id);
    console.log('선택된 캐릭터의 ID:', id);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        {Array(12).fill(null).map((_, index) => (
          <button key={index} className={styles.characterButton}>
            <div className={styles.skeleton}></div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {characters.map((char) => (
        <button
          key={char.id}
          className={`${styles.characterButton} ${selected === char.id ? styles.selected : ''}`}
          onClick={() => handleCharacterClick(char.id)}
        >
          <img src={char.imageUrl} alt={char.name} className={styles.characterImage} />
          {selected === char.id && (
            <img src={selectedIcon} alt="Selected" className={styles.selectedIcon} />
          )}
        </button>
      ))}
    </div>
  );
};

export default CharacterBox;