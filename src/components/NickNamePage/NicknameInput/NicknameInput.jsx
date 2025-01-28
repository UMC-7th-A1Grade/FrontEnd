// import React, { useState, useEffect } from 'react';
// import styles from './NicknameInput.module.css';

// const NicknameInput = ({ onComplete }) => {
//  const [nickname, setNickname] = useState('');
//  const [validationState, setValidationState] = useState('default');
//  const [errorMessage, setErrorMessage] = useState('');

//  // 임시 데이터 (API 연동 시 제거)
//  const existingNicknames = ['이진동', '임채현'];

//  useEffect(() => {
//    onComplete?.({
//      success: validationState === 'valid',
//      nickname: validationState === 'valid' ? nickname : null,
//    });
//  }, [validationState, nickname, onComplete]);

//  const validateNickname = (value) => {
//    // 공백 체크
//    if (!value || !value.trim()) {
//      setValidationState('default');
//      return false;
//    }

//    // 공백 포함 체크
//    if (value.includes(' ')) {
//      setValidationState('invalid');
//      setErrorMessage('공백은 사용할 수 없어요!');
//      return false;
//    }

//    // 특수문자 체크
//    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
//    if (specialCharRegex.test(value)) {
//      setValidationState('invalid');
//      setErrorMessage('특수문자는 사용할 수 없어요!');
//      return false;
//    }

//    // 길이 체크 (2-5자)
//    if (value.length < 2 || value.length > 5) {
//      setValidationState('invalid');
//      setErrorMessage('2자 이상 5자 이하만 입력해주세요!');
//      return false;
//    }

//    // 문자 유형 체크 (한글, 영문, 숫자만)
//    const regex = /^[가-힣a-zA-Z0-9]+$/;
//    if (!regex.test(value)) {
//      setValidationState('invalid');
//      setErrorMessage('한글, 영문, 숫자만 사용할 수 있어요!');
//      return false;
//    }

//    // 임시 중복 체크 (API 연동 전까지 사용)
//    if (existingNicknames.includes(value)) {
//      setValidationState('invalid');
//      setErrorMessage('이미 존재하는 닉네임이에요!');
//      return false;
//    }

//    setValidationState('valid');
//    setErrorMessage('');
//    return true;
//  };

//  const handleInputChange = (e) => {
//    const value = e.target.value;
//    setNickname(value);
//    validateNickname(value);
//  };

//  const inputClassName = `${styles.nicknameInput} ${
//    validationState === 'valid' ? styles.validInput :
//    validationState === 'invalid' ? styles.invalidInput : ''
//  }`;

//  const getGuideText = () => {
//    if (validationState === 'invalid') return errorMessage;
//    if (validationState === 'valid') return '사용 가능한 닉네임이에요!';
//    return '2자 이상 5자 이하, 한글, 영문, 숫자만 허용 / 공백 및 특수문자는 사용 불가합니다.';
//  };

//  const guideClassName = `${styles.guide} ${
//    validationState === 'invalid' ? styles.error :
//    validationState === 'valid' ? styles.valid : ''
//  }`;

//  return (
//    <div className={styles.inputContainer}>
//      <input
//        type="text"
//        className={inputClassName}
//        placeholder="닉네임을 입력해 주세요!"
//        value={nickname}
//        onChange={handleInputChange}
//        maxLength={5}
//      />
//      <p className={guideClassName}>{getGuideText()}</p>
//    </div>
//  );
// };

// export default NicknameInput;



import React, { useState, useEffect } from 'react';
import styles from './NicknameInput.module.css';

const NicknameInput = ({ onComplete }) => {
  const [nickname, setNickname] = useState('');
  const [validationState, setValidationState] = useState('default');
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    onComplete?.({
      success: validationState === 'valid',
      nickname: validationState === 'valid' ? nickname : null,
    });
  }, [validationState, nickname, onComplete]);

  // 닉네임 중복 체크 API 호출
  const checkNicknameAvailability = async (value) => {
    try {
      setIsChecking(true);
      
      // API 엔드포인트와 쿼리스트링 설정
      const response = await fetch(`http://192.168.219.101:5173/api/users?name=${encodeURIComponent(value)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();

      // API 응답에 따른 처리
      if (!data.exists) {  // 중복되지 않은 경우
        setValidationState('valid');
        setErrorMessage('');
        return true;
      } else {
        setValidationState('invalid');
        setErrorMessage('이미 존재하는 닉네임이에요!');
        return false;
      }
    } catch (error) {
      console.error('닉네임 중복 체크 중 오류 발생:', error);
      setValidationState('invalid');
      setErrorMessage('닉네임 확인 중 오류가 발생했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const validateNickname = async (value) => {
    // 공백 체크
    if (!value || !value.trim()) {
      setValidationState('default');
      return false;
    }

    // 공백 포함 체크
    if (value.includes(' ')) {
      setValidationState('invalid');
      setErrorMessage('공백은 사용할 수 없어요!');
      return false;
    }

    // 특수문자 체크
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharRegex.test(value)) {
      setValidationState('invalid');
      setErrorMessage('특수문자는 사용할 수 없어요!');
      return false;
    }

    // 길이 체크 (2-5자)
    if (value.length < 2 || value.length > 5) {
      setValidationState('invalid');
      setErrorMessage('2자 이상 5자 이하만 입력해주세요!');
      return false;
    }

    // 문자 유형 체크 (한글, 영문, 숫자만)
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(value)) {
      setValidationState('invalid');
      setErrorMessage('한글, 영문, 숫자만 사용할 수 있어요!');
      return false;
    }

    // 모든 검증을 통과하면 API로 중복 체크
    return await checkNicknameAvailability(value);
  };

  // 디바운스를 위한 타이머
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    // 이전 타이머가 있다면 취소
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // 새로운 타이머 설정 (500ms 후에 검증 실행)
    const timer = setTimeout(() => {
      validateNickname(value);
    }, 500);

    setDebounceTimer(timer);
  };

  const inputClassName = `${styles.nicknameInput} ${
    validationState === 'valid' ? styles.validInput :
    validationState === 'invalid' ? styles.invalidInput : ''
  }`;

  const getGuideText = () => {
    if (isChecking) return '닉네임 확인 중...';
    if (validationState === 'invalid') return errorMessage;
    if (validationState === 'valid') return '사용 가능한 닉네임이에요!';
    return '2자 이상 5자 이하, 한글, 영문, 숫자만 허용 / 공백 및 특수문자는 사용 불가합니다.';
  };

  const guideClassName = `${styles.guide} ${
    validationState === 'invalid' ? styles.error :
    validationState === 'valid' ? styles.valid : ''
  }`;

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={inputClassName}
        placeholder="닉네임을 입력해 주세요!"
        value={nickname}
        onChange={handleInputChange}
        maxLength={5}
        disabled={isChecking}
      />
      <p className={guideClassName}>{getGuideText()}</p>
    </div>
  );
};

export default NicknameInput;