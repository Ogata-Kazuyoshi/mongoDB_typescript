// import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../../styles/Personal/navbar.css';
import authApi from '../../api/auth';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { failIsAuth, setUsernameGlobal } from '../../features/Slice/UserSlice';

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userAuth.username);

  // useEffect(() => {
  //   navigate('/personal/main');
  // }, [isAuth]);

  const logoutHandle = async () => {
    const res = await authApi.logout();
    console.log('res : ', res);
    if (res.data.message) {
      dispatch(failIsAuth());
      dispatch(setUsernameGlobal(''));
    }
    navigate('/auth/login');
  };

  const changeToMain = () => {
    navigate('/personal/main');
  };
  const changeToRecord = () => {
    navigate('/personal/record');
  };
  const changeToRanking = () => {
    navigate('/personal/ranking');
  };
  const changeToSetting = () => {
    navigate('/personal/setting');
  };

  return (
    <div className="main">
      <div className="main__nav">
        <div className="main__nav--content" onClick={changeToMain}>
          <PersonIcon className="main__nav--icon" />
          <div>
            <label>{username}</label>
          </div>
        </div>
        <div className="main__nav--content" onClick={changeToRecord}>
          <DescriptionIcon className="main__nav--icon" />
          <div>
            <label>記録</label>
          </div>
        </div>
        <div className="main__nav--content" onClick={changeToRanking}>
          <SocialDistanceIcon className="main__nav--icon" />
          <div>
            <label>ランキング</label>
          </div>
        </div>
        <div className="main__nav--content" onClick={changeToSetting}>
          <SettingsIcon className="main__nav--icon" />
          <div>
            <label>設定</label>
          </div>
        </div>
        <div className="main__nav--content" onClick={logoutHandle}>
          <LogoutIcon className="main__nav--icon" />
          <div>
            <label>ログアウト</label>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Navbar;
