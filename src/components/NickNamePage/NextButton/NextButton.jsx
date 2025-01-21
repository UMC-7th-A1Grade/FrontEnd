import { useNavigate } from 'react-router-dom';
import styles from './NextButton.module.css';

const NextButton = ({ onComplete, isValid, nickname }) => {
  const navigate = useNavigate();

  // API 엔드포인트 상수 (실제 엔드포인트로 수정 필요)
  // const API_ENDPOINTS = {
  //   SAVE_USER: '/api/users/save',
  // };

  // 엄격한 유효성 검증 함수
  const isValidNickname = (nickname) => {
    if (!nickname || typeof nickname !== 'string') return false;
    if (nickname.length < 2 || nickname.length > 5) return false;
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(nickname)) return false;
    return true;
  };

  const handleClick = async () => {
    // 모든 유효성 검사를 다시 한번 수행
    if (!isValid || !isValidNickname(nickname)) {
      return;
    }

    try {
      // API 저장 로직 (실제 API 연동 시 주석 해제)
      // const result = await saveUserInfo(nickname);
      // if (result.success) {
      //   onComplete?.({ success: true, nickname });
      //   navigate('/next-page');
      // }

      // 임시 코드 (API 연동 전까지 사용)
      if (isValid && isValidNickname(nickname)) {
        onComplete?.({ 
          success: true, 
          nickname,
        });
        navigate('/next-page');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 버튼 활성화 조건 검사
  const isButtonEnabled = isValid && isValidNickname(nickname);

  return (
    <button
      className={styles.nextButton}
      onClick={handleClick}
      disabled={!isButtonEnabled}
      type="button"
    >
      다음으로
    </button>
  );
};

export default NextButton;