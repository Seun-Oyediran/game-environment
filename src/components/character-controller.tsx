/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Soldier } from "../models";
import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { Joystick, PlayerState, isHost } from "playroomkit";

interface IProps {
  position?: THREE.Vector3;
  joyStick: Joystick;
  currentUser: boolean;
  state: PlayerState;
  players: { state: PlayerState; joyStick: Joystick }[];
}

const MOVEMENT_SPEED = 200;

const CharacterController = (props: IProps) => {
  const {
    position = new THREE.Vector3(0, 0, 0),
    joyStick,
    currentUser,
    state,
  } = props;
  const rigidBodyRef = useRef<any>();
  const characterRef = useRef<any>();
  const cameraControlRef = useRef<any>();
  const [animation, setAnimation] = useState("Idle");

  const isOnFloor = useRef(true);

  useFrame((_, delta) => {
    setAnimation("Idle");

    const angle = joyStick.angle();

    if (joyStick.isJoystickPressed() && angle) {
      setAnimation("Run");
      characterRef.current.rotation.y = angle;

      // move character in its own direction
      const impulse = {
        x: Math.sin(angle) * MOVEMENT_SPEED * delta,
        y: 0,
        z: Math.cos(angle) * MOVEMENT_SPEED * delta,
      };

      rigidBodyRef?.current?.applyImpulse(impulse, true);
    }

    if (joyStick.isPressed("jump")) {
      if (!isOnFloor.current) return;
      isOnFloor.current = false;
      rigidBodyRef?.current?.applyImpulse({ x: 0, y: 90, z: 0 }, true);
    }

    if (isHost()) {
      state.setState("pos", rigidBodyRef.current.translation());
    } else {
      const pos = state.getState("pos");
      if (pos) {
        rigidBodyRef.current.setTranslation(pos);
      }
    }

    const cameraDistanceY = window.innerWidth < 1024 ? 16 : 20;
    const cameraDistanceZ = window.innerWidth < 1024 ? 12 : 16;
    const playerWorldPos = vec3(rigidBodyRef.current?.translation());
    // console.log(playerWorldPos);

    if (cameraControlRef.current) {
      cameraControlRef.current.setLookAt(
        playerWorldPos.x,
        playerWorldPos.y + cameraDistanceY,
        playerWorldPos.z + cameraDistanceZ,
        playerWorldPos.x,
        playerWorldPos.y + 1.5,
        playerWorldPos.z,
        true
      );
    }
  });

  return (
    <group position={position}>
      {currentUser && <CameraControls ref={cameraControlRef} />}
      <RigidBody
        ref={rigidBodyRef}
        lockRotations
        colliders={false}
        linearDamping={12}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
        gravityScale={3}
        type={isHost() ? "dynamic" : "kinematicPosition"}
      >
        <CapsuleCollider args={[0.8, 0.7]} position={[0, 1.4, 0]} />
        <group ref={characterRef}>
          <Soldier animation={animation} />
        </group>
      </RigidBody>
    </group>
  );
};

export default CharacterController;
