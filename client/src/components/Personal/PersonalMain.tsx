import { useEffect } from 'react';
import { checkAuth } from '../../controllers/helperFunction';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/hooks';
import { passIsAuth, setUsernameGlobal } from '../../features/Slice/UserSlice';
import { UserInfo } from '../../interface/global';
import { setChoosenVehicle } from '../../features/Slice/SelectVehicleSlice';

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
        if (result.vehicle) {
          dispatch(setChoosenVehicle(result.vehicle));
        }
      }
    };
    initialize();
  }, []);

  const settingVehicle = () => {
    navigate('/game/setting');
  };
  const startGame = () => {
    window.alert('まだプログラム作ってないっす！！！');
  };
  return (
    <div className="main__content">
      <div className="main__content--wrap">
        <div>
          <button className="game_btn" onClick={settingVehicle}>
            車選択
          </button>
        </div>
        <div>
          <button className="game_btn" onClick={startGame}>
            ゲームスタート
          </button>
        </div>
      </div>
      Personal_Main
    </div>
  );
};

export default PersonalMain;
