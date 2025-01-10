import React from 'react';
import styles from '../../styles/rankingPage/UserCard.module.css';

function UserCard({ name, character }) {
  return (
    <div className={styles.userCard}>
      <img 
        src={character} 
        alt={`${name} 캐릭터 아이콘`} 
        className={styles.characterIcon} 
      />
      <div className={styles.rankName}>{name}</div>
    </div>
  );
}

export default UserCard;
