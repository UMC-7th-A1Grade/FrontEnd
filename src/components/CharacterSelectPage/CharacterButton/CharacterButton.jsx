// // components/CharacterSelectPage/CharacterButton/CharacterButton.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import CustomButton from '../../global/CustomButton';

// const CharacterButton = ({ isSelected }) => {
//  const navigate = useNavigate();

//  const handleClick = () => {
//    if (isSelected) {
//      navigate('/');
//    } else {
//      navigate('/nickname');
//    }
//  };

//  return (
//    <CustomButton 
//      size="big"
//      color={isSelected ? "blue" : "gray"}
//      type="filled"
//      onClick={handleClick}
//      text={isSelected ? "선택완료" : "뒤로가기"}
//    />
//  );
// };

// export default CharacterButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../global/CustomButton';
import api from '../../../apis/axios';

const CharacterButton = ({ isSelected, selectedCharacter }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isSelected) {
      navigate('/nickname');
      return;
    }

    try {
      const nickname = localStorage.getItem('tempNickname');
      if (!nickname) {
        console.error('닉네임 정보가 없습니다.');
        navigate('/nickname');
        return;
      }

      // 올바른 엔드포인트와 요청 본문 구조
      const response = await api.patch('/api/users', {
        nickname,
        characterId: selectedCharacter
      });

      if (response.data.isSuccess) {
        localStorage.removeItem('tempNickname');
        // 성공 응답 처리
        console.log('저장된 사용자 정보:', response.data.result);
        navigate('/');
      } else {
        alert(response.data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 404) {
        alert('API 엔드포인트를 찾을 수 없습니다.');
      } else {
        alert(error.response?.data?.message || '오류가 발생했습니다.');
      }
    }
  };

  return (
    <CustomButton
      size="big"
      color={isSelected ? "blue" : "gray"}
      type="filled"
      onClick={handleClick}
      text={isSelected ? "선택완료" : "뒤로가기"}
    />
  );
};

export default CharacterButton;