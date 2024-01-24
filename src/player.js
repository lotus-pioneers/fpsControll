import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";

export const Player = ({ children }) => {
  const [ref, api] = useSphere(() => ({
    mass: 0,
    type: "Dynamic",
    position: [0, 0, 0]
  }));

  return <mesh ref={ref}>{children}</mesh>;
};

export const PlayerControll = ({ children }) => {
  const SPEED = 15;
  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump"
  };
  const moveFieldByKey = (key) => keys[key];
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const speed = new THREE.Vector3();
  const rotation = new THREE.Vector3();

  const usePlayerControls = (camera) => {
    const [cameraPosition, setCameraPosition] = useState(0);
    const [movement, setMovement] = useState({
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false
    });

    useEffect(() => {
      const handleKeyDown = (e) =>
        setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
      const handleKeyUp = (e) => {
        setCameraPosition(camera.position);
        setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
      };
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

    return movement;
  };

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [-80, 0, 25]
  }));
  const { camera } = useThree();
  const { forward, backward, left, right, jump } = usePlayerControls(camera);

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    setTimeout(() => {
      camera.rotateY(11);
    }, 100);
    api.velocity.subscribe((v) => (velocity.current = v));
  }, []);

  useFrame((state) => {
    ref.current.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    speed.fromArray(velocity.current);
    camera.position.y = 3;
    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });

  return <mesh ref={ref}>{children}</mesh>;
};
