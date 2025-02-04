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
        const token = localStorage.getItem('accessToken');
        console.log('Token:', token);  // 토큰 확인

        const response = await api.get('/api/characters', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('API 전체 응답:', response);
        console.log('캐릭터 데이터:', response.data.result);

        if (response.data.isSuccess) {
          if (response.data.result.characters && response.data.result.characters.length > 0) {
            setCharacters(response.data.result.characters);
          } else {
            console.warn('캐릭터 데이터가 비어있습니다:', response.data);
          }
        }
      } catch (error) {
        console.error('캐릭터 정보 조회 실패:', error);
        console.error('에러 상세:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
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