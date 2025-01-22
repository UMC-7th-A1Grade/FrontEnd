import CustomButton from '../../global/CustomButton';
import { useNavigate } from 'react-router-dom';

const LinkStoragePageButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/storage');
  };

  return (
    <CustomButton 
      size="small"
      color="blue"
      type="filled"
      onClick={handleClick}
      text="저장소"
    />
  );
};

export default LinkStoragePageButton; 