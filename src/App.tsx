import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { useMemo } from "react";
import { Physics } from "@react-three/rapier";

// eslint-disable-next-line react-refresh/only-export-components
export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
  run = "run",
}

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.run, keys: ["Shift"] },
    ],
    []
  );

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 30, 10], fov: 30 }}
        >
          {/* <color attach="background" args={["#202020"]} />
        <fog attach="fog" args={["#202020", 5, 20]} /> */}

          <Physics>
            <Experience />
          </Physics>
          {/* <OrbitControls /> */}

          <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[50, 50]} />
            <meshPhongMaterial />
          </mesh>
        </Canvas>
      </KeyboardControls>
    </>
  );
}

export default App;
