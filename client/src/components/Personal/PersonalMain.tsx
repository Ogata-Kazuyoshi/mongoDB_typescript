import React, { useEffect } from 'react';
import { checkAuth } from '../../controllers/helperFunction';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/hooks';
import { passIsAuth, setUsernameGlobal } from '../../features/Slice/UserSlice';
import { UserInfo } from '../../interface/global';

const PersonalMain = () => {
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

  const startGame = () => {
    navigate('/game');
  };
  return (
    <div className="main__content">
      <div>
        <button className="game_btn" onClick={startGame}>
          ゲームスタート
        </button>
      </div>
      Personal_Main
    </div>
  );
};

export default PersonalMain;
