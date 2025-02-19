import { useEffect, useState } from 'react';
import styles from '../../styles/global/customButton.module.css';

const CustomButton = ({ size, color, type, onClick, text }) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768); // iPad 사이즈
    };

    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  // 크기 설정 (iPad일 경우 1.3배 증가)
  const sizes = {
    small: { width: isTablet ? '114px' : '88px', height: isTablet ? '34px' : '26px' },
    middle: { width: isTablet ? '130px' : '100px', height: isTablet ? '42px' : '32px' },
    big: { width: isTablet ? '210px' : '162px', height: isTablet ? '44px' : '34px' },
    large: { width: isTablet ? '242px' : '186px', height: isTablet ? '44px' : '34px' },
  };

  return (
    <button
      className={`${styles.customButton} ${styles[color]} ${
        type === 'outline' ? styles.outline : styles.filled
      }`}
      style={sizes[size]}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
