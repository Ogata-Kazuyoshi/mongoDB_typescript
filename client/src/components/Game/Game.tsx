import React, { useState } from 'react';
import Setting from '../Personal/Setting';
import SettingTop from './Setting/SettingTop';
import GameContent from './GameContent/GameContent';

const Game = () => {
  const [isChoose, setIsChoose] = useState<boolean>(true);
  return <div>{isChoose ? <SettingTop /> : <GameContent />}</div>;
};

export default Game;
