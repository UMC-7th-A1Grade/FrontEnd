import api from './axios';

// 백엔드 에러 메시지 분석 함수
const analyzeBackendError = (error) => {
  if (!error.response?.data) return '백엔드 응답 없음';

  const errorData = error.response.data;
  let errorLocation = '';

  // 백엔드 에러 메시지 분석
  if (errorData.result?.includes('UserDetails.getUsername()')) {
    errorLocation = `
    위치: JwtAuthenticationFilter.java
    메소드: doFilterInternal()
    원인: 토큰에서 추출한 socialId로 사용자를 찾지 못함
    검증 필요:
    1. CustomUserDetailsService.loadUserByUsername()
    2. UserRepository.findBySocialId()
    `;
  } else if (errorData.message?.includes('JWT')) {
    errorLocation = `
    위치: JwtProvider.java
    메소드: validateToken() 또는 extractSocialId()
    원인: JWT 토큰 검증 실패
    `;
  } else if (errorData.code === 'CREDIT4002') {
    errorLocation = `
    위치: CreditServiceImpl.java
    메소드: getCredit()
    원인: 사용자의 크레딧 정보를 찾지 못함
    검증 필요:
    1. CreditRepository.findByUser_Email()
    2. OAuth2TokenService.handleLogin()에서 크레딧 생성 여부
    3. Credit 테이블 데이터 상태
    `;
  }

  return errorLocation || '알 수 없는 위치';
};

// 상세 디버깅 로그 함수
const debugLog = (type, message, data = null) => {
  const styles = {
    api: 'color: #2196F3; font-weight: bold;',
    success: 'color: #4CAF50; font-weight: bold;',
    error: 'color: #f44336; font-weight: bold;',
    warning: 'color: #ff9800; font-weight: bold;',
    info: 'color: #9c27b0; font-weight: bold;',
    backend: 'color: #795548; font-weight: bold;'
  };

  console.group(`%c[${type.toUpperCase()}] ${new Date().toISOString()}`, styles[type.toLowerCase()]);
  console.log(message);
  if (data) {
    console.log('상세 정보:', data);
  }
  console.groupEnd();
};

// 토큰 검증 함수
const validateToken = (token) => {
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('잘못된 JWT 형식');
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    debugLog('info', 'JWT 페이로드 분석', {
      socialId: payload.sub,
      exp: new Date(payload.exp * 1000).toLocaleString(),
      iat: new Date(payload.iat * 1000).toLocaleString()
    });

    return true;
  } catch (error) {
    debugLog('error', 'JWT 토큰 분석 실패', error);
    return false;
  }
};

// axios 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      if (!validateToken(token)) {
        debugLog('warning', '유효하지 않은 토큰 형식', {
          token: token.substring(0, 10) + '...',
          timestamp: new Date().toISOString()
        });
        return Promise.reject(new Error('Invalid token format'));
      }

      config.headers['Authorization'] = `Bearer ${token}`;
      debugLog('info', 'API 요청 정보', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        timestamp: new Date().toISOString()
      });
    } else {
      debugLog('warning', '토큰이 존재하지 않음', {
        url: config.url,
        method: config.method,
        localStorage: {
          accessToken: localStorage.getItem('accessToken'),
          allKeys: Object.keys(localStorage)
        }
      });
    }
    return config;
  },
  (error) => {
    debugLog('error', '요청 인터셉터 에러', error);
    return Promise.reject(error);
  }
);

// 사용자 닉네임 조회
export const getUserNickname = async () => {
  debugLog('api', '닉네임 조회 API 호출 시작');
  
  try {
    debugLog('info', '백엔드 처리 과정', `
    1. JwtAuthenticationFilter.doFilterInternal() 
      - Authorization 헤더에서 토큰 추출
      - 토큰 유효성 검증
    2. JwtProvider.extractSocialId()
      - 토큰에서 socialId 추출
    3. CustomUserDetailsService.loadUserByUsername()
      - socialId로 사용자 조회
    4. UserController.getUserNickname()
      - 닉네임 정보 반환
    `);

    const response = await api.get('/api/users/nickname');
    debugLog('success', '닉네임 조회 성공', {
      data: response.data,
      status: response.status,
      headers: response.headers,
      timestamp: new Date().toISOString()
    });
    
    return {
      nickname: response.data.result.nickName,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    const errorLocation = analyzeBackendError(error);
    debugLog('error', '닉네임 조회 실패', {
      errorType: error.name,
      errorMessage: error.message,
      errorLocation: errorLocation,
      response: error.response?.data,
      request: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      },
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

// 사용자 크레딧 조회
export const getUserCredits = async () => {
  debugLog('api', '크레딧 조회 API 호출 시작');
  
  try {
    debugLog('info', '백엔드 처리 과정', `
    1. JwtAuthenticationFilter.doFilterInternal() 
      - Authorization 헤더에서 토큰 추출
      - 토큰 유효성 검증
    2. JwtProvider.extractSocialId()
      - 토큰에서 socialId 추출
    3. CustomUserDetailsService.loadUserByUsername()
      - socialId로 사용자 조회
    4. CreditController.getCredit()
      - creditService.getCredit() 호출
    5. CreditService.getCredit()
      - User 엔티티로 크레딧 정보 조회
    6. CreditRepository.findByUser()
      - DB에서 사용자 크레딧 조회
    `);

    const response = await api.get('/api/credits');
    debugLog('success', '크레딧 조회 성공', {
      data: response.data,
      status: response.status,
      headers: response.headers,
      timestamp: new Date().toISOString()
    });
    
    return {
      credits: response.data.result.totalCredit,
      isSuccess: response.data.isSuccess
    };
  } catch (error) {
    const errorLocation = analyzeBackendError(error);
    
    if (error.response?.data?.code === 'CREDIT4002') {
      debugLog('info', '크레딧 정보 없음 - 기본값 반환', {
        errorType: error.response.data.code,
        errorMessage: error.response.data.message,
        errorLocation: errorLocation,
        defaultValue: 10,
        추가확인사항: [
          '회원가입 완료 여부',
          'OAuth2TokenService handleLogin 메소드에서 크레딧 생성 로직',
          'CreditService의 createCredit 메소드 동작',
          'credit 테이블의 데이터 상태'
        ],
        timestamp: new Date().toISOString()
      });
      
      return {
        credits: 10,
        isSuccess: true
      };
    }

    debugLog('error', '크레딧 조회 실패', {
      errorType: error.name,
      errorMessage: error.message,
      errorLocation: errorLocation,
      errorCode: error.response?.data?.code,
      response: error.response?.data,
      request: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      },
      timestamp: new Date().toISOString(),
      stackTrace: error.stack
    });
    throw error;
  }
};