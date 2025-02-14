import React from 'react';
import styles from './ChatBotButton.module.css';
import chatbotImage from '../../../assets/images/home/chatbot.png';

const ChatbotButton = () => {
  const handleClick = () => {
    alert('추후 구현 예정입니다.');
  };

  return (
    <button 
      className={styles.chatbot_button}
      onClick={handleClick} 
    >
      <div className={styles.chatbot_content}>
        <img 
          src={chatbotImage} 
          alt="챗봇" 
          className={styles.chatbot_icon}
        />
        <span className={styles.chatbot_text}>챗봇</span>
      </div>
    </button>
  );
};

export default ChatbotButton;
