import { useRef, useEffect } from 'react';
import styles from '../styles/cameraPage/CameraPage.module.css';
import { useNavigate } from 'react-router-dom';
import 'cropperjs/dist/cropper.css';

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 카메라 스트림 시작 (후면 카메라 설정)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // 후면 카메라 활성화
        audio: false, // 오디오 비활성화
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('카메라 접근 에러:', err);
    }
  };

  // 사진 촬영
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      navigate('/camera/edit', { state: { photo: dataURL } });
    }
  };

  const handleThumbnailClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 클릭
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 선택된 첫 번째 파일
    if (file) {
      // 여기에서 파일을 처리하는 로직을 작성
      console.log('선택된 파일:', file);
      // 예시로 파일을 URL로 변환하여 콘솔에 출력
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('파일 URL:', reader.result);
        // 여기에 선택된 이미지를 처리하는 함수를 호출할 수 있음
      };
      reader.readAsDataURL(file);
      navigate('/camera/edit', { state: { photo: URL.createObjectURL(file) } });
    }
  };

  // 컴포넌트가 렌더링될 때 카메라 시작
  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // 스트림 정지
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.camera}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', maxWidth: '500px' }}
        />
        <img
          className={styles.shutter}
          onClick={capturePhoto}
          src='/shutter.png'
        />
        <img
          onClick={handleThumbnailClick}
          className={styles.thumbnail}
          src='/thumbnail.png'
        />
      </div>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*' // 이미지 파일만 선택 가능
        style={{ display: 'none' }}
        onChange={handleFileChange} // 파일이 선택되면 handleFileChange 실행
      />
    </div>
  );
};

export default CameraPage;
