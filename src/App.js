import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, PointerLockControls, Sky } from "@react-three/drei";
import { FPSControls } from "react-three-fpscontrols";
import { Physics } from "@react-three/cannon";

import MainStage from "./MainStage";
import Ground from "./ground";
import { Player, PlayerControll } from "./player";
import { Cube } from "./cube";

export default function Viewer() {
  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 80 }}>
        <Suspense fallback={null}>
          <pointLight position={[10, 10, 10]} />
          <Sky sunPosition={[100, 10, 100]} />
          <Physics gravity={[0, -30, 0]}>
            <MainStage />
            <Ground />
            <Cube isBox boxArgs={[3, 10, 10]} position={[0, 0, -20]} />
            <Player>
              <FPSControls
                camProps={{
                  makeDefault: true,
                  fov: 80,
                  position: [0, 2.537, 0.7]
                }}
                orbitProps={{
                  target: [0, 2.537, 0]
                }}
                enableJoystick
                enableKeyboard
              />
            </Player>
            {/* <PlayerControll />
            <PointerLockControls /> */}
          </Physics>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
