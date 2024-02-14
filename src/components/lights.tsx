import { Environment } from "@react-three/drei";

const Lights = () => {
  // const dirLight = useRef<any>(null);
  // const dirLight2 = useRef<any>(null);
  // const dirLight3 = useRef<any>(null);
  // const dirLight4 = useRef<any>(null);

  // useHelper(dirLight, DirectionalLightHelper, 1, "red");
  // useHelper(dirLight2, DirectionalLightHelper, 1, "blue");
  // useHelper(dirLight3, DirectionalLightHelper, 1, "green");
  // useHelper(dirLight4, DirectionalLightHelper, 1, "black");

  return (
    <mesh>
      {/* <ambientLight intensity={1} />

      <directionalLight position={[2, 0, 0.866]} />

      <directionalLight position={[-2, 0, 0.866]} />

      <directionalLight intensity={0.3} position={[0, 4, 3]} />

      <directionalLight intensity={0.3} position={[0, 4, -3]} /> */}

      <ambientLight intensity={0.25} />
      <directionalLight
        // ref={directionalLight}
        position={[25, 18, -25]}
        intensity={0.3}
        // castShadow={!downgradedPerformance} // Disable shadows on low-end devices
        shadow-camera-near={0}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        castShadow
      />

      {/* <directionalLight
        position={[10, 10, 5]}
        intensity={0.6}
        shadow-mapSize={[1024, 1024]}
      /> */}
      {/* <spotLight intensity={0.3} position={[-8, 1000, 8]} /> */}
      <Environment preset="sunset" />
    </mesh>
  );
};

export default Lights;
