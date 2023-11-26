import { Suspense, useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useAppDispatch, useAppSelector } from '../../../features/hooks';
import { notDecided } from '../../../features/Slice/SelectVehicleSlice';
import { waitingChooseTime } from '../../../controllers/vehicleController';

interface RenderType {
  vehiclename: string;
}

const RenderVehicle: React.FC<RenderType> = (props) => {
  const isDecide = useAppSelector((state) => state.selectVehicle.isDecide);
  const dispatch = useAppDispatch();

  const { vehiclename } = props;
  const ref = useRef<Mesh>(null);
  const [vehicle, setVehicle] = useState(
    `../assets/car/${vehiclename}/scene.gltf`
  );
  const gltf = useGLTF(vehicle);

  useFrame(() => {
    if (ref.current && isDecide) {
      ref.current.rotation.y += 0 - 0.1;
    }
  });
  useEffect(() => {
    setVehicle(`../assets/car/${vehiclename}/scene.gltf`);
  }, [vehiclename]);

  useEffect(() => {
    if (isDecide) {
      setTimeout(() => {
        dispatch(notDecided());
      }, waitingChooseTime);
    }
  }, [isDecide]);
  return (
    <>
      <Suspense fallback={null}>
        <primitive object={gltf.scene} ref={ref} />
      </Suspense>
    </>
  );
};

export default RenderVehicle;
