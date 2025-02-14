import styles from '../../styles/global/customButton.module.css';

const CustomButton = ({ size, color, type, onClick, text }) => {
  // 크기 설정
  const sizes = {
    small: { width: '88px', height: '26px' },
    middle: { width: '100px', height: '32px' },
    big: { wicddth: '162px', height: '34px' },
    large: { width: '186px', height: '34px' },
  };

  const buttonStyle = {
    ...sizes[size], // 크기 적용
  };

  return (
    <button
      className={`${styles.button} ${styles[color]} ${
        type === 'outline' ? styles.outline : styles.filled
      }`}
      style={buttonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;