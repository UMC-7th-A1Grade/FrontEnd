import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from '../../styles/randomPage/Handwriting.module.css';

const Handwriting = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [showControls, setShowControls] = useState(false); // 되돌리기/지우기 버튼 표시 여부

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctxRef.current = canvas.getContext('2d');
    drawGrid();
  }, []);

  useEffect(() => {
    redrawCanvas();
  }, [paths]);

  // 부모 컴포넌트에서 Base64 이미지 데이터를 가져갈 수 있도록 함
  useImperativeHandle(ref, () => ({
    getCanvasImage: () => {
      const canvas = canvasRef.current;
      return canvas.toDataURL('image/png'); // Base64 이미지 변환
    }
  }));

  const startDrawing = (event) => {
    setIsDrawing(true);
    setShowControls(true); 
    const { offsetX, offsetY } = getCoordinates(event);
    setCurrentPath([{ x: offsetX, y: offsetY }]);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(event);
    setCurrentPath((prev) => [...prev, { x: offsetX, y: offsetY }]);
    drawPath([...currentPath, { x: offsetX, y: offsetY }]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (currentPath.length > 0) {
      setPaths((prev) => [...prev, currentPath]);
    }
    setCurrentPath([]);
  };

  const getCoordinates = (event) => {
    if (event.touches) {
      const touch = event.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }
    return { offsetX: event.nativeEvent.offsetX, offsetY: event.nativeEvent.offsetY };
  };

  const drawPath = (path) => {
    const ctx = ctxRef.current;
    if (path.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const redrawCanvas = () => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawGrid();
    paths.forEach(drawPath);
  };

  const drawGrid = () => {
    const ctx = ctxRef.current;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvasRef.current.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasRef.current.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvasRef.current.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasRef.current.width, y);
      ctx.stroke();
    }
  };

  const undoLastStroke = () => {
    setPaths((prev) => prev.slice(0, -1));
    if (paths.length === 1) setShowControls(false);
  };

  const clearCanvas = () => {
    setPaths([]);
    setShowControls(false);
  };

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      ></canvas>

      {showControls && (
        <div className={styles.controls}>
          <button onClick={undoLastStroke}>되돌리기</button>
          <button onClick={clearCanvas}>초기화</button>
        </div>
      )}
    </div>
  );
});

export default Handwriting;
