// // import React, { useEffect, useState } from 'react';
// // import { useSearchParams } from 'react-router-dom';
// // import axios from 'axios';

// // const GoogleCallbackPage = () => {
// //   const [searchParams] = useSearchParams();
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const handleGoogleLogin = async () => {
// //       try {
// //         const code = searchParams.get('code');
// //         console.log('Received Authorization Code:', code);

// //         if (!code) {
// //           setError('인가 코드가 없습니다.');
// //           return;
// //         }

// //         const response = await axios({
// //           method: 'GET',
// //           baseURL: import.meta.env.VITE_SERVER_URL,
// //           url: '/api/users/google',
// //           params: { code },
// //           withCredentials: true,
// //           headers: {
// //             'Content-Type': 'application/json'
// //           }
// //         });

// //         console.log('Response:', response.data);

// //         const { isSuccess, code: responseCode, message, result } = response.data;

// //         if (isSuccess) {
// //           // 성공 케이스 (AUTH2002)
// //           const { email, accessToken, socialId } = result;
// //           localStorage.setItem('accessToken', accessToken);
// //           localStorage.setItem('userEmail', email);
// //           localStorage.setItem('socialId', socialId);
// //           window.location.href = '/nickname';
// //         } else {
// //           // 실패 케이스 (AUTH4002 등)
// //           console.error('Login failed:', {
// //             code: responseCode,
// //             message: message
// //           });
// //           setError(message);
// //         }
// //       } catch (error) {
// //         console.error('Login Error:', {
// //           status: error.response?.status,
// //           data: error.response?.data,
// //           message: error.message
// //         });

// //         // 에러 응답 처리
// //         if (error.response?.data?.code === 'AUTH4002') {
// //           setError('구글 로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
// //         } else {
// //           setError(error.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.');
// //         }
// //       }
// //     };

// //     handleGoogleLogin();
// //   }, [searchParams]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen">
// //       {error ? (
// //         <div className="text-red-500 text-xl text-center">
// //           <div>{error}</div>
// //           <button 
// //             onClick={() => window.location.href = '/login'} 
// //             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //           >
// //             로그인 페이지로 돌아가기
// //           </button>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
// //           <h2 className="mt-4 text-xl font-semibold">로그인 처리 중입니다...</h2>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default GoogleCallbackPage;

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const GoogleCallbackPage = () => {
//   const [searchParams] = useSearchParams();
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handleGoogleLogin = async () => {
//       try {
//         const code = searchParams.get('code');
//         console.log('Received Authorization Code:', code);

//         if (!code) {
//           setError('인가 코드가 없습니다.');
//           return;
//         }

//         const response = await axios({
//           method: 'GET',
//           baseURL: import.meta.env.VITE_SERVER_URL,
//           url: '/api/users/google',
//           params: { code },
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });

//         console.log('Response:', response.data);

//         if (response.data.isSuccess) {
//           const { email, accessToken, socialId, nickname } = response.data.result;
          
//           // 필요한 정보들을 localStorage에 저장
//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('userEmail', email);
//           localStorage.setItem('socialId', socialId);
//           localStorage.setItem('userNickname', nickname || '사용자');  // 닉네임 저장 추가
          
//           // nickname이 없는 경우 닉네임 설정 페이지로, 있는 경우 홈페이지로 이동
//           window.location.href = nickname ? '/' : '/nickname';
//         } else {
//           setError(response.data.message || '로그인에 실패했습니다.');
//         }
//       } catch (error) {
//         console.error('Login Error:', error.response?.data);
//         setError(error.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.');
//       }
//     };

//     handleGoogleLogin();
//   }, [searchParams]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       {error ? (
//         <div className="text-red-500 text-xl text-center">
//           <div>{error}</div>
//           <button 
//             onClick={() => window.location.href = '/login'} 
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             로그인 페이지로 돌아가기
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
//           <h2 className="mt-4 text-xl font-semibold">로그인 처리 중입니다...</h2>
//         </>
//       )}
//     </div>
//   );
// };

// export default GoogleCallbackPage;

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('GoogleCallbackPage 마운트됨');

    const handleGoogleLogin = async () => {
      try {
        // 1. URL 파라미터 확인
        const code = searchParams.get('code');
        console.log('받은 인가 코드:', code);

        if (!code) {
          console.error('인가 코드 없음');
          setError('인가 코드가 없습니다.');
          return;
        }

        // 2. API 요청
        const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/users/google`;
        console.log('API 요청 준비:', {
          url: apiUrl,
          code: code
        });

        const response = await axios({
          method: 'GET',
          baseURL: import.meta.env.VITE_SERVER_URL,
          url: '/api/users/google',
          params: { code },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('API 응답:', response.data);

        if (response.data.isSuccess) {
          const { email, accessToken, socialId } = response.data.result;
          
          // 로컬 스토리지 저장 전 현재 상태 출력
          console.log('저장할 데이터:', {
            email,
            tokenLength: accessToken?.length,
            socialId
          });

          // 데이터 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('socialId', socialId);

          // 저장 후 확인
          console.log('로컬 스토리지 저장 완료:', {
            savedToken: localStorage.getItem('accessToken'),
            savedEmail: localStorage.getItem('userEmail'),
            savedSocialId: localStorage.getItem('socialId')
          });

          // 페이지 이동
          navigate('/nickname');
        } else {
          console.error('로그인 실패:', response.data);
          throw new Error(response.data.message || '로그인에 실패했습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', {
          message: error.message,
          response: error.response?.data,
          stack: error.stack
        });

        if (error.response?.data?.code === 'AUTH4002') {
          navigate('/login');
          return;
        }

        setError(error.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.');
      }
    };

    handleGoogleLogin();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error ? (
        <div className="text-red-500 text-xl text-center">
          <div>{error}</div>
          <div className="mt-2 text-sm text-gray-600">
            인가 코드: {searchParams.get('code')?.substring(0, 10)}...
          </div>
          <button 
            onClick={() => navigate('/login')} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      ) : (
        <>
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <h2 className="mt-4 text-xl font-semibold">로그인 처리 중입니다...</h2>
          <p className="mt-2 text-sm text-gray-600">
            인가 코드: {searchParams.get('code')?.substring(0, 10)}...
          </p>
        </>
      )}
    </div>
  );
};

export default GoogleCallbackPage;