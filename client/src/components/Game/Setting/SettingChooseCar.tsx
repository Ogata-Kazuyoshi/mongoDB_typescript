import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import RenderVehicle from './RenderVehicle';
import MovingObject from './MovingObject';
import { useAppDispatch, useAppSelector } from '../../../features/hooks';
import { decided } from '../../../features/Slice/SelectVehicleSlice';
import authApi from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { waitingChooseTime } from '../../../controllers/vehicleController';

const SettingChooseCar: React.FC<{ vehiclename: string }> = (props) => {
  const { vehiclename } = props;
  const boxMovingRef = useRef<{ resetControls: () => void }>();
  const dispatch = useAppDispatch();
  const chooseVehicle = useAppSelector(
    (state) => state.selectVehicle.choosenVehicle
  );
  const navigate = useNavigate();

  const decideCar = async () => {
    try {
      dispatch(decided());
      const res = await authApi.update({ vehicle: chooseVehicle });
      console.log('res : ', res);
      setTimeout(() => {
        navigate('/personal/main');
      }, waitingChooseTime + 500);
    } catch (err) {
      console.log(`err : ${err}`);
    }
  };
  return (
    <div className="setting_choosecar">
      <div className="setting__choosecar-wrapping">
        <Canvas>
          <RenderVehicle vehiclename={vehiclename} />
          <ambientLight intensity={3} />
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
