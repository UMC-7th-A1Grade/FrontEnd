import React, { useRef, useState, useEffect } from 'react';
import styles from '../../styles/randomPage/Handwriting.module.css';

function Handwriting() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const lastTouchDistance = useRef(null);
  const lastTouchCenter = useRef({ x: 0, y: 0 });
  const isZooming = useRef(false);
  const activeTouchId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctxRef.current = canvas.getContext('2d');
    drawGrid();
  }, []);

  useEffect(() => {
    redrawCanvas();
  }, [paths, scale, offset]);

  const startDrawing = (event) => {
    if (isZooming.current) return;
    if (event.touches && event.touches.length > 1) return;
    
    // 첫번째 터치 추적해서 필기할때 불편함(손바닥이 캔버스에 닿아서 그림그려짐)을 방지함!
    if (event.touches) {
      if (activeTouchId.current === null) {
        activeTouchId.current = event.touches[0].identifier;
      } else {
        return;
      }
    }
    
    const { offsetX, offsetY } = getCoordinates(event);
    setIsDrawing(true);
    setCurrentPath([{ x: offsetX, y: offsetY }]);
    setShowControls(true);
  };

  const draw = (event) => {
    if (!isDrawing || isZooming.current) return;
    
    if (event.touches) {
      const touch = [...event.touches].find(t => t.identifier === activeTouchId.current);
      if (!touch) return;
    }
    
    const { offsetX, offsetY } = getCoordinates(event);
    setCurrentPath((prev) => [...prev, { x: offsetX, y: offsetY }]);
    drawPath([...currentPath, { x: offsetX, y: offsetY }]);
  };

  const stopDrawing = (event) => {
    // 그리기 종료 및 경로저장
    if (isDrawing) {
      setPaths((prev) => [...prev, currentPath]);
      setCurrentPath([]);
      setIsDrawing(false);
    }
    
    if (event.touches) {
      activeTouchId.current = null;
    }
  };

  const getCoordinates = (event) => {
    // 이벤트 좌표 가져옴
    if (event.touches) {
      const touch = [...event.touches].find(t => t.identifier === activeTouchId.current);
      if (!touch) return { offsetX: 0, offsetY: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: (touch.clientX - rect.left - offset.x) / scale,
        offsetY: (touch.clientY - rect.top - offset.y) / scale,
      };
    }
    return { offsetX: event.nativeEvent.offsetX / scale, offsetY: event.nativeEvent.offsetY / scale };
  };

  const drawPath = (path) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const redrawCanvas = () => {
    const ctx = ctxRef.current;
    ctx.setTransform(scale, 0, 0, scale, offset.x, offset.y);
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawGrid();
    paths.forEach((path) => drawPath(path));
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
    // 되돌리기 버튼용
    setPaths((prev) => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    // 초기화 버튼용
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
          <button onClick={clearCanvas}>전체 지우기</button>
        </div>
      )}
    </div>
  );
}

export default Handwriting;
