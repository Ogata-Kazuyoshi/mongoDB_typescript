import { useEffect } from 'react';
import { checkAuth } from '../../controllers/helperFunction';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/hooks';
import { passIsAuth, setUsernameGlobal } from '../../features/Slice/UserSlice';
import { UserInfo } from '../../interface/global';

const Record = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      const result: UserInfo | false = await checkAuth();
      if (!result) {
        navigate('/auth/login');
      } else {
        //ここで、isAuthとUsernameのセットのしなおし
        dispatch(passIsAuth());
        dispatch(setUsernameGlobal(result.username));
      }
    };
    initialize();
  }, []);
  return <div className="main__content">Record</div>;
};

export default Record;
