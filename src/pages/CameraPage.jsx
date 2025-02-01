import { useState, useRef, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import styles from '../styles/cameraPage/CameraPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading';

const CameraPage = () => {
  const [photo, setPhoto] = useState(null); // 캡처된 사진
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);

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

      // 높이를 80vh로 설정
      const canvasHeight = window.innerHeight * 0.8;

      // 비율에 따라 너비 계산
      const aspectRatio = video.videoWidth / video.videoHeight;
      const canvasWidth = canvasHeight * aspectRatio;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // 비디오 이미지를 캔버스에 그리기
      context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
      const dataURL = canvas.toDataURL('image/png');

      setPhoto(dataURL); // 사진 데이터를 저장하여 화면 전환
    }
  };

  // 파일 선택
  const handleThumbnailClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 클릭
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // 파일 데이터를 저장하여 화면 전환
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 자르기
  const handleCrop = async () => {
    setIsLoading(true);
    if (cropperRef.current) {
      const cropperInstance = cropperRef.current?.cropper;
      if (cropperInstance) {
        const croppedDataUrl = cropperInstance.getCroppedCanvas().toDataURL('image/png');

        // Base64 → Blob 변환
        const dataURLtoBlob = (dataURL) => {
          const arr = dataURL.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        };

        const blob = dataURLtoBlob(croppedDataUrl);
        const file = new File([blob], 'cropped.png', { type: 'image/png' });

        const formData = new FormData();
        formData.append('image', file);

        try {
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/open-ai/confirm`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const data = res.data.result.success;
          console.log(data);

          if (data) {
            navigate('/afterShooting', {
              state: {
                image: croppedDataUrl,
              },
            });
          } else {
            alert('뭔가 잘못된 것 같아요.');
            navigate('/camera');
          }
        } catch (error) {
          alert('서버 비상', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  // 컴포넌트가 렌더링될 때 카메라 시작
  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (photo) {
    // 사진 편집 화면
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.cropContainer}>
          <Cropper
            ref={cropperRef}
            src={photo}
            style={{ width: '100%', height: '80vh' }}
            guides={true}
            viewMode={1}
            dragMode='none'
          />
          <img
            className={styles.shutter}
            onClick={handleCrop}
            src='/upload.png'
            alt='업로드 버튼'
          />
        </div>
      </div>
    );
  }

  // 기본 카메라 화면
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
          alt='촬영 버튼'
        />
        <img
          onClick={handleThumbnailClick}
          className={styles.thumbnail}
          src='/thumbnail.png'
          alt='썸네일 버튼'
        />
      </div>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CameraPage;
