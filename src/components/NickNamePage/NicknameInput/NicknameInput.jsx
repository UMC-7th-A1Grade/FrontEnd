

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import styles from './NicknameInput.module.css';

// const NicknameInput = ({ onComplete }) => {
//   const [nickname, setNickname] = useState('');
//   const [validationState, setValidationState] = useState('default');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isValidating, setIsValidating] = useState(false);
//   const timeoutRef = useRef(null);

//   // 임시 데이터 (API 연동 시 제거)
//   const existingNicknames = ['이진동', '임채현'];

//   const validateNickname = useCallback((value) => {
//     // 이미 검증 중이면 중복 요청 방지
//     if (isValidating) return;
//     setIsValidating(true);
    
//     console.log(`닉네임 검증 시작: ${value} - ${new Date().toLocaleTimeString()}`);

//     // 공백 체크
//     if (!value || !value.trim()) {
//       setValidationState('default');
//       setIsValidating(false);
//       return false;
//     }

//     // 공백 포함 체크
//     if (value.includes(' ')) {
//       setValidationState('invalid');
//       setErrorMessage('공백은 사용할 수 없어요!');
//       setIsValidating(false);
//       return false;
//     }

//     // 특수문자 체크
//     const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
//     if (specialCharRegex.test(value)) {
//       setValidationState('invalid');
//       setErrorMessage('특수문자는 사용할 수 없어요!');
//       setIsValidating(false);
//       return false;
//     }

//     // 길이 체크 (2-5자)
//     if (value.length < 2 || value.length > 5) {
//       setValidationState('invalid');
//       setErrorMessage('2자 이상 5자 이하만 입력해주세요!');
//       setIsValidating(false);
//       return false;
//     }

//     // 문자 유형 체크 (한글, 영문, 숫자만)
//     const regex = /^[가-힣a-zA-Z0-9]+$/;
//     if (!regex.test(value)) {
//       setValidationState('invalid');
//       setErrorMessage('한글, 영문, 숫자만 사용할 수 있어요!');
//       setIsValidating(false);
//       return false;
//     }

//     // 임시 중복 체크 시뮬레이션
//     setTimeout(() => {
//       if (existingNicknames.includes(value)) {
//         setValidationState('invalid');
//         setErrorMessage('이미 존재하는 닉네임이에요!');
//       } else {
//         setValidationState('valid');
//         setErrorMessage('');
//       }
//       setIsValidating(false);
//     }, 500);

//     return true;
//   }, [isValidating, existingNicknames]);

//   useEffect(() => {
//     onComplete?.({
//       success: validationState === 'valid',
//       nickname: validationState === 'valid' ? nickname : null,
//     });
//   }, [validationState, nickname, onComplete]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setNickname(value);

//     // 이전 타이머 취소
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     // 새로운 타이머 설정 (1초 디바운스)
//     timeoutRef.current = setTimeout(() => {
//       validateNickname(value);
//     }, 1000);
//   };

//   // 컴포넌트 언마운트 시 타이머 정리
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const inputClassName = `${styles.nicknameInput} ${
//     validationState === 'valid' ? styles.validInput :
//     validationState === 'invalid' ? styles.invalidInput : ''
//   }`;

//   const getGuideText = () => {
//     if (isValidating) return '닉네임을 확인하는 중이에요...';
//     if (validationState === 'invalid') return errorMessage;
//     if (validationState === 'valid') return '사용 가능한 닉네임이에요!';
//     return '2자 이상 5자 이하, 한글, 영문, 숫자만 허용 / 공백 및 특수문자는 사용 불가합니다.';
//   };

//   const guideClassName = `${styles.guide} ${
//     validationState === 'invalid' ? styles.error :
//     validationState === 'valid' ? styles.valid : ''
//   }`;

//   return (
//     <div className={styles.inputContainer}>
//       <input
//         type="text"
//         className={inputClassName}
//         placeholder="닉네임을 입력해 주세요!"
//         value={nickname}
//         onChange={handleInputChange}
//         maxLength={5}
//         disabled={isValidating}
//       />
//       <p className={guideClassName}>{getGuideText()}</p>
//     </div>
//   );
// };

// export default NicknameInput;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import api from '../../../apis/axios';
import styles from './NicknameInput.module.css';

const NicknameInput = ({ onComplete }) => {
  const [nickname, setNickname] = useState('');
  const [validationState, setValidationState] = useState('default');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const timeoutRef = useRef(null);

  const validateNickname = useCallback(async (value) => {
    // 이미 검증 중이면 중복 요청 방지
    if (isValidating) return false;
    setIsValidating(true);

    console.log(`닉네임 검증 시작: ${value} - ${new Date().toLocaleTimeString()}`);

    // 기본 유효성 검사 (기존 로직 유지)
    if (!value || !value.trim()) {
      setValidationState('default');
      setIsValidating(false);
      return false;
    }

    // 공백 포함 체크
    if (value.includes(' ')) {
      setValidationState('invalid');
      setErrorMessage('공백은 사용할 수 없어요!');
      setIsValidating(false);
      return false;
    }

    // 특수문자 체크
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharRegex.test(value)) {
      setValidationState('invalid');
      setErrorMessage('특수문자는 사용할 수 없어요!');
      setIsValidating(false);
      return false;
    }

    // 길이 체크 (2-5자)
    if (value.length < 2 || value.length > 5) {
      setValidationState('invalid');
      setErrorMessage('2자 이상 5자 이하만 입력해주세요!');
      setIsValidating(false);
      return false;
    }

    // 문자 유형 체크 (한글, 영문, 숫자만)
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(value)) {
      setValidationState('invalid');
      setErrorMessage('한글, 영문, 숫자만 사용할 수 있어요!');
      setIsValidating(false);
      return false;
    }

    try {
      // API 호출
      const response = await api.get('/api/users', {
        params: { nickname: value }
      });

      console.log('API 응답:', response);

      // 백엔드 응답에 따른 상태 처리
      if (response.data.isSuccess) {
        setValidationState('valid');
        setErrorMessage('');
        setIsValidating(false);
        return true;
      } else {
        setValidationState('invalid');
        setErrorMessage(response.data.message || '사용할 수 없는 닉네임입니다.');
        setIsValidating(false);
        return false;
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류:', error);
      
      setValidationState('invalid');
      setErrorMessage('닉네임 확인 중 오류가 발생했어요.');
      setIsValidating(false);
      return false;
    }
  }, [isValidating]);

  useEffect(() => {
    onComplete?.({
      success: validationState === 'valid',
      nickname: validationState === 'valid' ? nickname : null,
    });
  }, [validationState, nickname, onComplete]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    // 이전 타이머 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 새로운 타이머 설정 (1초 디바운스)
    timeoutRef.current = setTimeout(() => {
      validateNickname(value);
    }, 1000);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const inputClassName = `${styles.nicknameInput} ${
    validationState === 'valid' ? styles.validInput :
    validationState === 'invalid' ? styles.invalidInput : ''
  }`;

  const getGuideText = () => {
    if (isValidating) return '닉네임을 확인하는 중이에요...';
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
        disabled={isValidating}
      />
      <p className={guideClassName}>{getGuideText()}</p>
    </div>
  );
};

export default NicknameInput;