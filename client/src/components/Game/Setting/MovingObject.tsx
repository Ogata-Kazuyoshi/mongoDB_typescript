import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import {
  useThree,
  extend,
  useFrame,
  ReactThreeFiber,
} from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Camera, WebGLRenderer, Vector3 } from 'three';
extend({ OrbitControls });

// useThreeフックから返されるglオブジェクトの型
interface ThreeCanvasProps {
  camera: Camera;
  gl: WebGLRenderer;
}

// OrbitControlsの型定義
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
    }
  }
}

const MovingObject = forwardRef((props, ref) => {
  const { camera, gl } = useThree<ThreeCanvasProps>();
  const controlsRef = useRef<OrbitControls>(null);

  useEffect(() => {
    camera.position.set(3, 3, 3);
    camera.lookAt(new Vector3(0, 0, 0));
  }, [camera]);

  useImperativeHandle(ref, () => ({
    resetControls: () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    },
  }));

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      rotateSpeed={0.8}
      //   enabled={false}
    />
  );
});

export default MovingObject;
