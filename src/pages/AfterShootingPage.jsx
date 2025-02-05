import { useLocation } from 'react-router-dom';
import Header from '../components/global/Header';
import QuestionSection from '../components/afterShootingPage/QuestionSection';
import ButtonSection from '../components/afterShootingPage/ButtonSection';

export default function AfterShootingPage() {
  const location = useLocation();
  const image = location.state?.image; // 전달된 이미지 데이터 가져오기
  const url = location.state?.url;
  return (
    <>
      <Header />
      <QuestionSection image={image} /> {/* 이미지 전달 */}
      <ButtonSection image={image} url={url}/>
    </>
  );
}
