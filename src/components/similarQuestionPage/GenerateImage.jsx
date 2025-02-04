export const generateImageFromText = (text) => { 
  // 해상도 배율 설정 (2배 해상도)
  const scaleFactor = 2;

  // 캔버스 크기 설정 (기본 크기 * 해상도 배율)
  const canvasWidth = 320 * scaleFactor;
  const canvasHeight = 228 * scaleFactor;

  // 캔버스 생성 및 2D 컨텍스트 가져오기
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 캔버스 크기 설정
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // 고해상도를 위한 스케일 적용
  ctx.scale(scaleFactor, scaleFactor);

  // 기본 폰트 설정
  const fontSize = 12;
  ctx.font = `${fontSize}px Arial`;

  // 패딩 설정
  const padding = 20;
  const maxTextWidth = (canvasWidth / scaleFactor) - padding * 2; // 텍스트 최대 너비

  // 흰 배경 채우기
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);

  // 텍스트 스타일 설정
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "top"; // 줄바꿈 처리를 위해 'top'으로 설정

  // 자동 줄바꿈 함수
  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';
      const lines = [];
      
      for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && i > 0) {
              lines.push(line);
              line = words[i] + ' ';
          } else {
              line = testLine;
          }
      }
      lines.push(line); // 마지막 줄 추가

      // 중앙 정렬된 위치 계산
      const startY = (canvasHeight / scaleFactor - lines.length * lineHeight) / 2;

      lines.forEach((line, index) => {
          context.fillText(line.trim(), x, startY + index * lineHeight);
      });
  };

  // 텍스트 그리기
  wrapText(ctx, text, canvasWidth / scaleFactor / 2, padding, maxTextWidth, fontSize * 1.5);

  // 캔버스를 이미지 data URL로 변환하여 반환
  return canvas.toDataURL("image/png");
};
