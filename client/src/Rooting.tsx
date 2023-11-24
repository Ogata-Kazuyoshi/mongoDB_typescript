import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rooting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ここ');
    navigate('/auth');
  }, []);
  return <div></div>;
};

export default Rooting;
