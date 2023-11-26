import { useEffect } from 'react';
import SettingHeader from './SettingHeader';
import SettingChooseCar from './SettingChooseCar';
import '../../../styles/Game/Setting/setting.css';
import { useAppDispatch, useAppSelector } from '../../../features/hooks';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../../interface/global';
import { checkAuth } from '../../../controllers/helperFunction';
import {
  passIsAuth,
  setUsernameGlobal,
} from '../../../features/Slice/UserSlice';
import { setChoosenVehicle } from '../../../features/Slice/SelectVehicleSlice';

const SettingTop = () => {
  const choosenVehicle = useAppSelector(
    (state) => state.selectVehicle.choosenVehicle
  );
  const isAuth = useAppSelector((state) => state.userAuth.isAuth);
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
  }, [isAuth]);
  return (
    <div className="settign__top">
      <SettingHeader />
      <SettingChooseCar vehiclename={choosenVehicle} />
    </div>
  );
};

export default SettingTop;
