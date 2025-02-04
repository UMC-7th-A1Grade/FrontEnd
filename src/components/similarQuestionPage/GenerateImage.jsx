export const generateImageFromText = (text) => {
    // 캔버스 생성 및 2D 컨텍스트 가져오기
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    // 기본 폰트 설정 (필요에 따라 변경)
    ctx.font = "20px Arial";
    const padding = 20;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = 24; // 20px 폰트의 대략적인 높이
  
    // 캔버스 크기 결정 (텍스트 크기에 padding 추가)
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;
  
    // 흰 배경 채우기
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // 텍스트 그리기 (중앙 정렬)
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
    // 캔버스를 이미지 data URL로 변환하여 반환
    return canvas.toDataURL("image/png");
  };
  