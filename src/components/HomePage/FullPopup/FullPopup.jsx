// import React, { useState, useEffect, useCallback } from 'react';
// import { createPortal } from 'react-dom';
// import styles from './FullPopup.module.css';
// import katex from 'katex';
// import 'katex/dist/katex.min.css';
// import { mathService } from '../../../apis/mathApi';

// const FullPopup = ({ userQuestionId, onClose }) => {
//   const [activeTab, setActiveTab] = useState('memo');
//   const [isLoading, setIsLoading] = useState(true);
//   const [questionData, setQuestionData] = useState({
//     questionImg: '',
//     answer: '',
//     memo: '',
//     note: []
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadQuestionData = async () => {
//       try {
//         setIsLoading(true);
//         const result = await mathService.getQuestionData(userQuestionId);
//         setQuestionData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadQuestionData();
//   }, [userQuestionId]);

//   const formatMemo = useCallback((memo) => {
//     if (!memo || !memo.includes('Step')) return [memo];
//     return memo.split(/(Step \d+: [^]*?(?=Step \d+:|$))/g)
//       .filter(part => part.trim() !== "");
//   }, []);

//   const separateTextAndMath = useCallback((text) => {
//     if (!text) return null;

//     // \n을 실제 줄바꿈으로 변환하되, LaTeX 수식 내부의 \n은 보존
//     const processedText = text.replace(/\\n(?![^$]*\$)/g, '\n');

//     return processedText.split(/(\$[^$]+\$)/g).map((part, index) => {
//       if (part.startsWith("$") && part.endsWith("$")) {
//         return (
//           <span
//             key={index}
//             dangerouslySetInnerHTML={{
//               __html: katex.renderToString(part.slice(1, -1), {
//                 throwOnError: false,
//                 displayMode: false,
//                 strict: false,
//                 trust: true,
//                 macros: {
//                   "\\ ": " ",
//                   "\\quad": "  ",
//                 },
//               }),
//             }}
//           />
//         );
//       }
//       // 일반 텍스트의 줄바꿈 처리
//       return part.split('\n').map((line, i) => (
//         <React.Fragment key={`${index}-${i}`}>
//           {line}
//           {i < part.split('\n').length - 1 && <br />}
//         </React.Fragment>
//       ));
//     });
//   }, []);

//   const renderContent = () => {
//     if (isLoading) {
//       return <div className={styles.skeleton} />;
//     }

//     if (activeTab === 'memo') {
//       return (
//         <div className={styles.memo_container}>
//           <img
//             src={questionData.questionImg}
//             alt="문제 이미지"
//             className={styles.problem_image}
//           />
//           <div className={styles.memo_text}>
//             {formatMemo(questionData.memo).map((part, index) => (
//               <div key={index} className={styles.memo_step}>
//                 {separateTextAndMath(part)}
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (!questionData.note?.length) {
//       return <div className={styles.no_note}>필기가 없습니다</div>;
//     }

//     return (
//       <img
//         src={questionData.note[0]}
//         alt="필기 이미지"
//         className={styles.problem_image}
//       />
//     );
//   };

//   if (error) {
//     mathService.showErrorPopup(error, onClose);
//     return null;
//   }

//   return createPortal(
//     <div className={styles.overlay}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <div className={styles.answer_container}>
//             <span>{`답: ${questionData.answer || '...'}`}</span>
//           </div>

//           <button className={styles.close_button} onClick={onClose}>
//             <img src="/images/home/X_button.png" alt="닫기" />
//           </button>

//           <div className={styles.toggle_buttons}>
//             <button
//               className={`${styles.toggle_button} ${activeTab === 'memo' ? styles.active : ''}`}
//               onClick={() => setActiveTab('memo')}
//             >
//               메모
//             </button>
//             <button
//               className={`${styles.toggle_button} ${activeTab === 'note' ? styles.active : ''}`}
//               onClick={() => setActiveTab('note')}
//             >
//               필기
//             </button>
//           </div>
//         </div>

//         <div className={styles.content}>
//           <div className={styles.image_container}>
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default FullPopup;


import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './FullPopup.module.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { mathService } from '../../../apis/mathApi';

const FullPopup = ({ userQuestionId, onClose }) => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState('memo');  // 현재 활성화된 탭 (메모/필기)
  const [isLoading, setIsLoading] = useState(true);    // 로딩 상태
  const [questionData, setQuestionData] = useState({   // 문제 데이터
    questionImg: '',
    answer: '',
    memo: '',
    note: []
  });
  const [error, setError] = useState(null);            // 에러 상태

  // 문제 데이터 불러오기
  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        setIsLoading(true);
        const result = await mathService.getQuestionData(userQuestionId);
        setQuestionData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestionData();
  }, [userQuestionId]);

  // 메모 텍스트를 스텝별로 분리하고 스텝 사이에 공백 추가
  const formatMemo = useCallback((memo) => {
    if (!memo || !memo.includes('Step')) return [memo];
    
    // Step으로 시작하는 부분을 기준으로 텍스트 분리하고 빈 문자열 제거
    const parts = memo.split(/(Step \d+: [^]*?(?=Step \d+:|$))/g)
      .filter(part => part.trim() !== "");
    
    // 스텝 사이에 빈 줄 추가
    const partsWithSpacing = [];
    parts.forEach((part, index) => {
      partsWithSpacing.push(part);
      // 마지막 스텝이 아닌 경우에만 빈 줄 추가
      if (index < parts.length - 1) {
        partsWithSpacing.push('');
      }
    });
    
    return partsWithSpacing;
  }, []);

  // 텍스트와 수식 분리하여 렌더링
  const separateTextAndMath = useCallback((text) => {
    if (!text) return null;

    // LaTeX 수식 내부의 \n은 보존하면서 일반 텍스트의 \n을 줄바꿈으로 변환
    const processedText = text.replace(/\\n(?![^$]*\$)/g, '\n');

    // $로 구분된 수식과 일반 텍스트를 분리하여 처리
    return processedText.split(/(\$[^$]+\$)/g).map((part, index) => {
      // LaTeX 수식 처리
      if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(part.slice(1, -1), {
                throwOnError: false,
                displayMode: false,
                strict: false,
                trust: true,
                macros: {
                  "\\ ": " ",
                  "\\quad": "  ",
                },
              }),
            }}
          />
        );
      }
      // 일반 텍스트의 줄바꿈 처리
      return part.split('\n').map((line, i) => (
        <React.Fragment key={`${index}-${i}`}>
          {line}
          {i < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  }, []);

  // 컨텐츠 렌더링 함수
  const renderContent = () => {
    // 로딩 중일 때 스켈레톤 UI 표시
    if (isLoading) {
      return <div className={styles.skeleton} />;
    }

    // 메모 탭 컨텐츠
    if (activeTab === 'memo') {
      return (
        <div className={styles.memo_container}>
          <img
            src={questionData.questionImg}
            alt="문제 이미지"
            className={styles.problem_image}
          />
          <div className={styles.memo_text}>
            {formatMemo(questionData.memo).map((part, index) => (
              <div key={index} className={styles.memo_step}>
                {separateTextAndMath(part)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 필기가 없을 때 메시지 표시
    if (!questionData.note?.length) {
      return <div className={styles.no_note}>필기가 없습니다</div>;
    }

    // 필기 탭 컨텐츠
    return (
      <img
        src={questionData.note[0]}
        alt="필기 이미지"
        className={styles.problem_image}
      />
    );
  };

  // 에러 발생 시 에러 팝업 표시
  if (error) {
    mathService.showErrorPopup(error, onClose);
    return null;
  }

  // 포털을 사용하여 팝업 렌더링
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* 답안 표시 영역 */}
          <div className={styles.answer_container}>
            <span>{`답: ${questionData.answer || '...'}`}</span>
          </div>

          {/* 닫기 버튼 */}
          <button className={styles.close_button} onClick={onClose}>
            <img src="/images/home/X_button.png" alt="닫기" />
          </button>

          {/* 탭 전환 버튼 */}
          <div className={styles.toggle_buttons}>
            <button
              className={`${styles.toggle_button} ${activeTab === 'memo' ? styles.active : ''}`}
              onClick={() => setActiveTab('memo')}
            >
              메모
            </button>
            <button
              className={`${styles.toggle_button} ${activeTab === 'note' ? styles.active : ''}`}
              onClick={() => setActiveTab('note')}
            >
              필기
            </button>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className={styles.content}>
          <div className={styles.image_container}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FullPopup;