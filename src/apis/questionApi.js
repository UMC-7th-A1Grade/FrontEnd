// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('accessToken');
    
//     // 요청 디버깅
//     console.log('=== 요청 디버깅 정보 ===');
//     console.log('토큰 상태:', accessToken ? '존재' : '없음');
//     if (!accessToken) {
//       console.warn('로컬 스토리지에 토큰이 없습니다.');
//     }
//     console.log('기본 URL:', config.baseURL);
//     console.log('요청 경로:', config.url);
    
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//       console.log('전체 헤더 정보:', config.headers);
//     }

//     return config;
//   },
//   (error) => {
//     console.error('요청 인터셉터 에러:', error);
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log('=== 응답 디버깅 정보 ===');
//     console.log('상태 코드:', response.status);
//     console.log('응답 데이터:', response.data);
//     return response;
//   },
//   (error) => {
//     console.error('=== 에러 디버깅 정보 ===');
//     console.error('요청 설정:', {
//       '기본 URL': error.config?.baseURL,
//       '요청 경로': error.config?.url,
//       '요청 방식': error.config?.method,
//       '요청 헤더': error.config?.headers
//     });
    
//     if (error.response) {
//       console.error('에러 응답:', {
//         '상태 코드': error.response.status,
//         '에러 데이터': error.response.data,
//         '응답 헤더': error.response.headers
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// export const getRecentQuestions = async () => {
//   console.log('=== 최근 문제 조회 디버깅 ===');
//   try {
//     // 로컬 스토리지 상태 확인
//     console.log('로컬 스토리지 상태:', {
//       '액세스 토큰': localStorage.getItem('accessToken') ? '존재' : '없음',
//       '사용자 이메일': localStorage.getItem('userEmail') || '없음',
//       '소셜 ID': localStorage.getItem('socialId') || '없음',
//       '사용자 닉네임': localStorage.getItem('userNickname') || '없음'
//     });

//     const response = await api.get('/api/question/recent');
//     return response.data.result.questions || [];
//   } catch (error) {
//     console.error('최근 문제 조회 에러:', {
//       '에러 메시지': error.message,
//       '상태 코드': error.response?.status,
//       '에러 데이터': error.response?.data
//     });
//     return [];
//   }
// };

// export default api;


import axios from 'axios';

/**
 * axios 인스턴스 생성
 * baseURL: 환경 변수에서 서버 URL 가져옴
 * withCredentials: CORS 요청 시 쿠키 포함
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 요청 인터셉터
 * 모든 API 요청 전에 실행되며, 주로 인증 토큰을 헤더에 추가하는 역할
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터
 * 모든 API 응답을 처리하며, 에러 발생 시 상세 정보를 포함하여 에러 전파
 */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 객체에 요청 정보와 응답 정보를 포함하여 전파
    if (error.response) {
      error.details = {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      };
    }
    return Promise.reject(error);
  }
);

/**
 * 최근 문제 목록을 조회하는 함수
 * @returns {Promise<Array>} 최근 문제 목록, 에러 발생 시 빈 배열 반환
 */

export const getRecentQuestions = async () => {
  try {
    const response = await api.get('/api/question/recent');
    return response.data.result.questions || [];
  } catch (error) {
    // 에러 발생 시 빈 배열 반환하여 UI 오류 방지
    return [];
  }
};

export default api;