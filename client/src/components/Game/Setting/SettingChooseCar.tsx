import { Canvas } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import RenderVehicle from './RenderVehicle';
import MovingObject from './MovingObject';

const SettingChooseCar = () => {
  const boxMovingRef = useRef<{ resetControls: () => void }>();
  const [isDecide, setIsDecide] = useState<boolean>(false);

  const decideCar = () => {
    setIsDecide(!isDecide);
  };
  return (
    <div className="setting_choosecar">
      <div className="setting__choosecar-wrapping">
        <Canvas>
          <RenderVehicle isDecide={isDecide} setIsDecide={setIsDecide} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <MovingObject ref={boxMovingRef} />
        </Canvas>
        <div className="setting__choosecar--btn">
          <button onClick={decideCar}>車を決定</button>
        </div>
      </div>
    </div>
  );
};

export default SettingChooseCar;
