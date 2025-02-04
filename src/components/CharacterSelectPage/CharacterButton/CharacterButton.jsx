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
      const token = localStorage.getItem('accessToken');

      if (!nickname || !token) {
        console.error('필요한 정보가 없습니다.');
        navigate('/nickname');
        return;
      }

      const requestBody = {
        nickname,
        characterId: selectedCharacter
      };
      
      console.log('Request Body:', requestBody);
      console.log('Selected Character:', selectedCharacter);
      console.log('Nickname:', nickname);

      const response = await api.patch('/api/users', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Response:', response);

      if (response.data.isSuccess) {
        localStorage.removeItem('tempNickname');
        navigate('/');
      } else {
        alert(response.data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
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