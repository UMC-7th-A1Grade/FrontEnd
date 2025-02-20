// // mathApi.js
// import axios from 'axios';

// const baseURL = import.meta.env.VITE_SERVER_URL;

// const ERROR_MESSAGES = {
//   QUESTION4003: '유저 문제를 찾을 수 없습니다.',
//   QUESTION4004: '존재하지 않는 문제입니다.',
//   QUESTION4005: '유효하지 않은 문제 ID입니다.',
//   QUESTION5000: '서버 오류가 발생했습니다.',
// };

// const STATUS_MESSAGES = {
//   400: '잘못된 요청입니다.',
//   401: '로그인이 필요한 서비스입니다.',
//   404: '요청하신 문제를 찾을 수 없습니다.',
//   500: '서버 오류가 발생했습니다.',
// };

// const showErrorPopup = (message, onClose) => {
//   const existingPopup = document.querySelector('.error-popup-overlay');
//   if (existingPopup) {
//     document.body.removeChild(existingPopup);
//   }

//   const overlay = document.createElement('div');
//   overlay.className = 'error-popup-overlay';
//   overlay.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   `;

//   const container = document.createElement('div');
//   container.style.cssText = `
//     background: white;
//     border-radius: 8px;
//     width: 85%;
//     max-width: 260px;
//     padding: 20px;
//     text-align: center;
//     font-family: 'Pretendard', sans-serif;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   `;

//   const messageEl = document.createElement('p');
//   messageEl.style.cssText = `
//     margin: 0 0 8px 0;
//     font-size: 14px;
//     color: #1E1E1E;
//     line-height: 1.5;
//     font-weight: 500;
//   `;
//   messageEl.textContent = message;

//   const subMessageEl = document.createElement('p');
//   subMessageEl.style.cssText = `
//     margin: 0 0 20px 0;
//     font-size: 14px;
//     color: #626262;
//     line-height: 1.5;
//   `;
//   subMessageEl.textContent = '잠시 후 다시 시도해 주세요';

//   const button = document.createElement('button');
//   button.style.cssText = `
//     width: 100%;
//     padding: 11px 0;
//     background-color: #00203E;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     font-family: 'Pretendard', sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     cursor: pointer;
//     transition: background-color 0.2s;
//   `;
//   button.textContent = '닫기';
  
//   button.onmouseover = () => {
//     button.style.backgroundColor = '#001529';
//   };
  
//   button.onmouseout = () => {
//     button.style.backgroundColor = '#00203E';
//   };
  
//   button.onclick = () => {
//     document.body.removeChild(overlay);
//     if (onClose) onClose();
//   };

//   container.appendChild(messageEl);
//   container.appendChild(subMessageEl);
//   container.appendChild(button);
//   overlay.appendChild(container);
//   document.body.appendChild(overlay);

//   // 반응형 스타일 적용
//   if (window.matchMedia('(min-width: 768px)').matches) {
//     container.style.maxWidth = '300px';
//     messageEl.style.fontSize = '15px';
//     subMessageEl.style.fontSize = '14px';
//     button.style.fontSize = '14px';
//   }
//   if (window.matchMedia('(min-width: 1024px)').matches) {
//     container.style.maxWidth = '320px';
//     messageEl.style.fontSize = '16px';
//     subMessageEl.style.fontSize = '15px';
//     button.style.fontSize = '15px';
//   }
// };

// const api = axios.create({
//   baseURL,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const handleError = (error) => {
//   const errorCode = error.response?.data?.code;
//   const statusCode = error.response?.status;
  
//   return ERROR_MESSAGES[errorCode] ||
//     STATUS_MESSAGES[statusCode] ||
//     error.response?.data?.message ||
//     '일시적인 오류가 발생했습니다.';
// };

// export const mathService = {
//   getQuestionData: async (userQuestionId) => {
//     if (!userQuestionId || isNaN(Number(userQuestionId))) {
//       throw new Error('유효한 문제 ID가 필요합니다.');
//     }

//     try {
//       const response = await api.get(`/api/question/${userQuestionId}`);
      
//       if (response.data?.isSuccess) {
//         return response.data.result;
//       }
      
//       throw new Error(response.data?.message || '데이터 조회에 실패했습니다.');
//     } catch (error) {
//       const errorMessage = handleError(error);
//       showErrorPopup(errorMessage);
//       throw new Error(errorMessage);
//     }
//   },
//   showErrorPopup,
// };

// export default api;

import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

const ERROR_MESSAGES = {
  QUESTION4003: '유저 문제를 찾을 수 없습니다.',
  QUESTION4004: '존재하지 않는 문제입니다.',
  QUESTION4005: '유효하지 않은 문제 ID입니다.',
  QUESTION5000: '서버 오류가 발생했습니다.',
};

const STATUS_MESSAGES = {
  400: '잘못된 요청입니다.',
  401: '로그인이 필요한 서비스입니다.',
  404: '요청하신 문제를 찾을 수 없습니다.',
  500: '서버 오류가 발생했습니다.',
};

const showErrorPopup = (message, onClose) => {
  const existingPopup = document.querySelector('.error-popup-overlay');
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }

  const overlay = document.createElement('div');
  overlay.className = 'error-popup-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    background: white;
    border-radius: 8px;
    width: 85%;
    max-width: 260px;
    padding: 20px;
    text-align: center;
    font-family: 'Pretendard', sans-serif;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `;

  const messageEl = document.createElement('p');
  messageEl.style.cssText = `
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #1E1E1E;
    line-height: 1.5;
    font-weight: 500;
  `;
  messageEl.textContent = message;

  const subMessageEl = document.createElement('p');
  subMessageEl.style.cssText = `
    margin: 0 0 20px 0;
    font-size: 14px;
    color: #626262;
    line-height: 1.5;
  `;
  subMessageEl.textContent = '잠시 후 다시 시도해 주세요';

  const button = document.createElement('button');
  button.style.cssText = `
    width: 100%;
    padding: 11px 0;
    background-color: #00203E;
    color: white;
    border: none;
    border-radius: 4px;
    font-family: 'Pretendard', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  `;
  button.textContent = '닫기';
  
  button.onmouseover = () => {
    button.style.backgroundColor = '#001529';
  };
  
  button.onmouseout = () => {
    button.style.backgroundColor = '#00203E';
  };
  
  button.onclick = () => {
    document.body.removeChild(overlay);
    if (onClose) onClose();
  };

  container.appendChild(messageEl);
  container.appendChild(subMessageEl);
  container.appendChild(button);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  if (window.matchMedia('(min-width: 768px)').matches) {
    container.style.maxWidth = '300px';
    messageEl.style.fontSize = '15px';
    subMessageEl.style.fontSize = '14px';
    button.style.fontSize = '14px';
  }
  if (window.matchMedia('(min-width: 1024px)').matches) {
    container.style.maxWidth = '320px';
    messageEl.style.fontSize = '16px';
    subMessageEl.style.fontSize = '15px';
    button.style.fontSize = '15px';
  }
};

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const handleError = (error) => {
  const errorCode = error.response?.data?.code;
  const statusCode = error.response?.status;
  
  return ERROR_MESSAGES[errorCode] ||
    STATUS_MESSAGES[statusCode] ||
    error.response?.data?.message ||
    '일시적인 오류가 발생했습니다.';
};

export const mathService = {
  getQuestionData: async (userQuestionId) => {
    if (!userQuestionId || isNaN(Number(userQuestionId))) {
      throw new Error('유효한 문제 ID가 필요합니다.');
    }

    try {
      const response = await api.get(`/api/question/${userQuestionId}`);
      
      if (response.data?.isSuccess) {
        return response.data.result;
      }
      
      throw new Error(response.data?.message || '데이터 조회에 실패했습니다.');
    } catch (error) {
      const errorMessage = handleError(error);
      showErrorPopup(errorMessage);
      throw new Error(errorMessage);
    }
  },
  showErrorPopup,
};

export default api;