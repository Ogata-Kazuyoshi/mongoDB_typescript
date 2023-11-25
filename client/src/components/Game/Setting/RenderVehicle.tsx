import { Suspense, forwardRef, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface RenderType {
  isDecide: boolean;
  setIsDecide: (arg: boolean) => void;
}

const macralen = '../assets/car/mclaren/scene.gltf';
const Model = forwardRef((props, ref) => {
  const gltf = useGLTF(macralen);
  return <primitive object={gltf.scene} ref={ref} />;
});

const RenderVehicle: React.FC<RenderType> = (props) => {
  const { isDecide, setIsDecide } = props;
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current && isDecide) {
      ref.current.rotation.y += 0 - 0.1;
    }
  });

  useEffect(() => {
    if (isDecide) {
      setTimeout(() => {
        setIsDecide(false);
      }, 3000);
    }
  }, [isDecide]);
  return (
    <>
      <Suspense fallback={null}>
        <Model ref={ref} />
      </Suspense>
    </>
  );
};

export default RenderVehicle;
