import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LinkCameraButton.module.css';
import cameraIcon from '../../../assets/images/home/camera_Home.svg';

const LinkCameraButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/camera');
  };

  return (
    <div 
      className={styles.circleContainer}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <img 
        src={cameraIcon}
        alt="camera icon"
        className={styles.cameraImage}
      />
    </div>
  );
};

export default LinkCameraButton;