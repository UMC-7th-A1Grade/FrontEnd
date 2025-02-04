import katex from 'katex';

export const generateImageFromText = (text) => {
  const scaleFactor = 2;
  const canvasWidth = 320 * scaleFactor;
  const canvasHeight = 228 * scaleFactor;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.scale(scaleFactor, scaleFactor);

  const fontSize = 12;
  ctx.font = `${fontSize}px Arial`;

  const padding = 20;
  const maxTextWidth = (canvasWidth / scaleFactor) - padding * 2;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // 수학식을 처리하는 함수
  const renderMathText = (text) => {
    try {
      // KaTeX로 수학 수식 렌더링
      return katex.renderToString(text, { throwOnError: false, displayMode: false });
    } catch (e) {
      return text; // 에러 발생 시 원래 텍스트 반환
    }
  };

  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    const lines = [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const isMath = word.includes('\\'); // 수학 기호가 있는지 확인
      const renderWord = isMath ? renderMathText(word) : word; // 수학 기호는 KaTeX 처리

      const testLine = line + renderWord + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        lines.push(line);
        line = renderWord + ' ';
      } else {
        line = testLine;
      }
    }

    lines.push(line); // 마지막 줄 추가

    const startY = (canvasHeight / scaleFactor - lines.length * lineHeight) / 2;

    lines.forEach((line, index) => {
      context.fillText(line.trim(), x, startY + index * lineHeight);
    });
  };

  wrapText(ctx, text, canvasWidth / scaleFactor / 2, padding, maxTextWidth, fontSize * 1.5);

  return canvas.toDataURL("image/png");
};
