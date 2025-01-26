// components/CharacterSelectPage/CharacterButton/CharacterButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../global/CustomButton';

const CharacterButton = ({ isSelected }) => {
 const navigate = useNavigate();

 const handleClick = () => {
   if (isSelected) {
     navigate('/home');
   } else {
     navigate('/nickname');
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