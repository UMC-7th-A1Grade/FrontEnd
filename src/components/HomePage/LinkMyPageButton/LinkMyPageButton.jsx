import CustomButton from '../../global/CustomButton';
import { useNavigate } from 'react-router-dom';

const LinkMyPageButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mypage');
  };

  return (
    <CustomButton 
      size="small"
      color="blue"
      type="filled"
      onClick={handleClick}
      text="MY"
    />
  );
};

export default LinkMyPageButton; 