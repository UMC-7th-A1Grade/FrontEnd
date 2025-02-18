import katex from 'katex';
import html2canvas from 'html2canvas';

/**
 * 주어진 텍스트(수식은 $...$ 로 감싸짐)를 HTML로 렌더링한 후,
 * html2canvas를 통해 캡쳐하여 이미지 데이터 URL을 반환하는 함수
 */
export const generateImageFromText = async (rawText) => {
  // 1. 오프스크린 컨테이너 생성 및 스타일 적용
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-10000px';
  container.style.top = '0';
  container.style.width = '320px'; // 원하는 이미지 너비
  container.style.padding = '20px';
  container.style.fontSize = '11px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.backgroundColor = 'white';
  container.style.color = 'black';
  container.style.textAlign = 'center';
  container.style.lineHeight = '1.5';
  
  //테스트용 텍스트
  //const exText = '실수 $x > \\frac{1}{200}$에 대하여 $\\log x$의 가수를 $g(x)$라 하자. 다음 조건을 만족시키는 두 실수 $c$, $d$의 순서쌍 $(c, d)$를 좌표평면에 나타낸 영역을 $S$라 하자. (가) $c < 0$이고 $d > 5$이다. (나) 함수 $y = 5g(x)$의 그래프와 직선 $y = cx + d$가 한 점에서만 만난다. 영역 $S$에 속하는 점 $(c, d)$에 대하여 $(c+10)^2 + d^2$의 최솟값은 $50\\frac{m}{n}$이다. $m+n$의 값을 구하시오. (단, $m$, $n$은 서로소인 자연수이다.)';
  
  // 2. 텍스트와 수식을 분리하여 컨테이너에 추가
  // 앞 뒤에 붙은 $로 원본 텍스트에서 수식과 일반 텍스트를 구분
  const parts = rawText.split(/(\$[^$]+\$)/g);
  parts.forEach((part) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      // 수식 부분: 앞뒤 '$' 제거
      const mathContent = part.slice(1, -1);
      const span = document.createElement('span');
      // KaTeX로 수식을 렌더링 (인라인 모드)
      span.innerHTML = katex.renderToString(mathContent, {
        throwOnError: false,
        displayMode: false,
      });
      container.appendChild(span);
    } else {
      // 일반 텍스트 부분
      const textNode = document.createTextNode(part);
      container.appendChild(textNode);
    }
  });

  // 3. 컨테이너를 문서에 추가
  document.body.appendChild(container);

  // 4. html2canvas로 캔버스 생성 (비동기)
  const canvas = await html2canvas(container, {
    backgroundColor: null,
    scale: 2, // 고해상도 이미지 생성
  });

  // 5. 컨테이너 제거
  document.body.removeChild(container);

  // 6. 캔버스에서 이미지 데이터 URL 반환
  return canvas.toDataURL("image/png");
};
