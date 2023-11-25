import React from 'react';
import SettingHeader from './SettingHeader';
import SettingChooseCar from './SettingChooseCar';
import '../../../styles/Game/Setting/setting.css';

const SettingTop = () => {
  return (
    <div className="settign__top">
      <SettingHeader />
      <SettingChooseCar />
    </div>
  );
};

export default SettingTop;
