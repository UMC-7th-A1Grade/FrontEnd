// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const GoogleCallbackPage = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const code = searchParams.get('code');
//     console.log('Authorization Code:', code);

//     if (code) {
//       handleGoogleLogin(code);
//     } else {
//       navigate('/login');
//     }
//   }, []);

//   const handleGoogleLogin = async (code) => {
//     try {
//       // code를 query parameter로 전송
//       const response = await axios.get(`/api/users/google?code=${code}`, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Response:', response.data);
//       const { isSuccess, result } = response.data;

//       if (isSuccess) {
//         // 토큰 및 사용자 정보 저장
//         localStorage.setItem('accessToken', result.accessToken);
//         localStorage.setItem('userEmail', result.email);
//         localStorage.setItem('socialId', result.socialId);

//         // 닉네임 페이지로 이동
//         window.location.href = '/nickname';
//       } else {
//         setError('로그인에 실패했습니다.');
//         setTimeout(() => navigate('/login'), 3000);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('로그인 처리 중 오류가 발생했습니다.');
//       setTimeout(() => navigate('/login'), 3000);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       {error ? (
//         <div className="text-red-500 text-xl">{error}</div>
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const GoogleCallbackPage = () => {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const [error, setError] = useState(null);

 useEffect(() => {
   const code = searchParams.get('code');
   console.log('보내는 코드:', code);

   if (code) {
     handleGoogleLogin(code);
   } else {
     navigate('/login');
   }
 }, []);

 const handleGoogleLogin = async (code) => {
  try {
    // 전체 URL 사용
    const response = await axios.get('http://localhost:8080/api/users/google', {
      params: { code },
      withCredentials: true
    });

    console.log('전체 응답:', response);
    console.log('응답 상태:', response.status);
    console.log('응답 데이터:', response.data);

    const { isSuccess, result } = response.data;

    if (isSuccess) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('userEmail', result.email);
      localStorage.setItem('socialId', result.socialId);

      window.location.href = '/nickname';
    } else {
      setError('로그인에 실패했습니다.');
      setTimeout(() => navigate('/login'), 3000);
    }
  } catch (error) {
    // 더 상세한 에러 로깅
    console.error('전체 에러:', error);
    console.error('에러 응답:', error.response);
    console.error('에러 요청:', error.request);
    console.error('에러 메시지:', error.message);

    setError('로그인 처리 중 오류가 발생했습니다.');
    setTimeout(() => navigate('/login'), 3000);
  }
};

 return (
   <div className="flex flex-col items-center justify-center min-h-screen">
     {error ? (
       <div className="text-red-500 text-xl">{error}</div>
     ) : (
       <>
         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
         <h2 className="mt-4 text-xl font-semibold">로그인 처리 중입니다...</h2>
       </>
     )}
   </div>
 );
};

export default GoogleCallbackPage;