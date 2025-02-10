import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const GoogleCallbackPage = () => {
 const [searchParams] = useSearchParams();
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
   console.log('GoogleCallbackPage 마운트됨');

   const handleGoogleLogin = async () => {
     try {
       const code = searchParams.get('code');
       console.log('받은 인가 코드:', code);

       if (!code) {
         console.error('인가 코드 없음');
         setError('인가 코드가 없습니다.');
         return;
       }

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
         
         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('userEmail', email);
         localStorage.setItem('socialId', socialId);

         try {
           const decodedToken = jwtDecode(accessToken);
           console.log('디코딩된 토큰:', decodedToken);

           // 토큰 재발급 시도
           const tokenResponse = await axios({
             method: 'POST',
             baseURL: import.meta.env.VITE_SERVER_URL,
             url: '/api/users/token',
             withCredentials: true,
             headers: {
               'Content-Type': 'application/json',
             }
           });

           if (tokenResponse.data.isSuccess) {
             const newAccessToken = tokenResponse.data.result;
             localStorage.setItem('accessToken', newAccessToken);
             
             const newDecodedToken = jwtDecode(newAccessToken);
             console.log('새로운 디코딩된 토큰:', newDecodedToken);
             
             if (newDecodedToken.isProfileComplete) {
               console.log('기존 사용자: 메인 페이지로 이동');
               navigate('/main');
             } else {
               console.log('신규 사용자: 닉네임 설정 페이지로 이동');
               navigate('/nickname');
             }
           }
         } catch (error) {
           console.error('토큰 처리 실패:', error);
           navigate('/nickname');
         }
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
         <button 
           onClick={() => navigate('/login')}
           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
         >
           로그인 페이지로 돌아가기
         </button>
       </div>
     ) : (
       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
     )}
   </div>
 );
};

export default GoogleCallbackPage;


// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const GoogleCallbackPage = () => {
//   const [searchParams] = useSearchParams();
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('GoogleCallbackPage 마운트됨');

//     const handleGoogleLogin = async () => {
//       try {
//         const code = searchParams.get('code');
//         console.log('받은 인가 코드:', code);

//         if (!code) {
//           console.error('인가 코드 없음');
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
//             'Content-Type': 'application/json',
//           }
//         });

//         console.log('API 응답:', response.data);

//         if (response.data.isSuccess) {
//           const { email, accessToken, socialId } = response.data.result;

//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('userEmail', email);
//           localStorage.setItem('socialId', socialId);

//           try {
//             // 사용자 정보 조회
//             const userInfoResponse = await axios({
//               method: 'GET',
//               baseURL: import.meta.env.VITE_SERVER_URL,
//               url: '/api/users/info',
//               withCredentials: true,
//               headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//               }
//             });

//             console.log('사용자 정보 응답:', userInfoResponse.data);

//             // 사용자 이름이 있으면 온보딩을 완료한 것으로 판단
//             if (userInfoResponse.data.isSuccess && userInfoResponse.data.result?.name) {
//               console.log('기존 사용자: 메인 페이지로 이동');
//               navigate('/main');
//             } else {
//               console.log('신규 사용자: 닉네임 설정 페이지로 이동');
//               navigate('/nickname');
//             }
//           } catch (userError) {
//             console.error('사용자 정보 조회 실패:', userError);
//             // 사용자 정보 조회 실패 시 닉네임 설정 페이지로 이동
//             navigate('/nickname');
//           }
//         } else {
//           console.error('로그인 실패:', response.data);
//           throw new Error(response.data.message || '로그인에 실패했습니다.');
//         }
//       } catch (error) {
//         console.error('에러 발생:', {
//           message: error.message,
//           response: error.response?.data,
//           stack: error.stack
//         });
        
//         if (error.response?.data?.code === 'AUTH4002') {
//           navigate('/login');
//           return;
//         }

//         setError(error.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.');
//       }
//     };

//     handleGoogleLogin();
//   }, [searchParams, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       {error ? (
//         <div className="text-red-500 text-xl text-center">
//           <div>{error}</div>
//           <button 
//             onClick={() => navigate('/login')}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             로그인 페이지로 돌아가기
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div> */}
//         </>
//       )}
//     </div>
//   );
// };

// export default GoogleCallbackPage;