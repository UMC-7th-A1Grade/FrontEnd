// import React, { useState, useEffect } from 'react';
// import styles from './CharacterBox.module.css';
// import selectedIcon from '../../../assets/images/characterSelectPage/Logo_character.png';
// import character1 from '../../../assets/images/characterSelectPage/character_1.png';
// import character2 from '../../../assets/images/characterSelectPage/character_2.png';
// import character3 from '../../../assets/images/characterSelectPage/character_3.png';
// import character4 from '../../../assets/images/characterSelectPage/character_4.png';
// import character5 from '../../../assets/images/characterSelectPage/character_5.png';
// import character6 from '../../../assets/images/characterSelectPage/character_6.png';
// import character7 from '../../../assets/images/characterSelectPage/character_7.png';
// import character8 from '../../../assets/images/characterSelectPage/character_8.png';
// import character9 from '../../../assets/images/characterSelectPage/character_9.png';
// import character10 from '../../../assets/images/characterSelectPage/character_10.png';
// import character11 from '../../../assets/images/characterSelectPage/character_11.png';
// import character12 from '../../../assets/images/characterSelectPage/character_12.png';

// const CharacterBox = ({ onSelect, selected }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   const characters = [
//     { id: 1, image: character1 },
//     { id: 2, image: character2 },
//     { id: 3, image: character3 },
//     { id: 4, image: character4 },
//     { id: 5, image: character5 },
//     { id: 6, image: character6 },
//     { id: 7, image: character7 },
//     { id: 8, image: character8 },
//     { id: 9, image: character9 },
//     { id: 10, image: character10 },
//     { id: 11, image: character11 },
//     { id: 12, image: character12 }
//   ];

//   useEffect(() => {
//     // 2초 후에 로딩 상태를 false로 변경
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleCharacterClick = (id) => {
//     onSelect(id);
//     console.log('선택된 캐릭터의 ID:', id);
//   };

//   if (isLoading) {
//     return (
//       <div className={styles.container}>
//         {Array(12).fill(null).map((_, index) => (
//           <button key={index} className={styles.characterButton}>
//             <div className={styles.skeleton}></div>
//           </button>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {characters.map((char) => (
//         <button
//           key={char.id}
//           className={`${styles.characterButton} ${selected === char.id ? styles.selected : ''}`}
//           onClick={() => handleCharacterClick(char.id)}
//         >
//           <img src={char.image} alt={`Character ${char.id}`} className={styles.characterImage} />
//           {selected === char.id && (
//             <img src={selectedIcon} alt="Selected" className={styles.selectedIcon} />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default CharacterBox;

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