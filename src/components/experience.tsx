import { Fragment, useEffect, useState } from "react";
import Lights from "./lights";
import { Map } from "../models";
import CharacterController from "./character-controller";
import { RigidBody } from "@react-three/rapier";
import {
  Joystick,
  PlayerState,
  insertCoin,
  myPlayer,
  onPlayerJoin,
} from "playroomkit";
import { Vector3 } from "three";

const Experience = () => {
  const [players, setPlayers] = useState<
    { state: PlayerState; joyStick: Joystick; id: string; name: string }[]
  >([]);

  console.log(players);

  const launchGame = async () => {
    await insertCoin();

    onPlayerJoin((state) => {
      const joyStick = new Joystick(state, {
        type: "angular",
        buttons: [
          { id: "fire", label: "Fire" },
          { id: "jump", label: "Jump" },
        ],
      });

      const newPlayer = {
        state,
        joyStick,
        id: state.id,
        name: state.getProfile().name,
      };
      setPlayers((prev) => [...prev, newPlayer]);

      state.onQuit(() => {
        setPlayers((prev) => prev.filter((item) => item.state.id !== state.id));
      });
    });
  };

  useEffect(() => {
    launchGame();
  }, []);

  return (
    <Fragment>
      <Lights />

      <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]}>
        <Map />
      </RigidBody>

      {players.map((item, i) => (
        <CharacterController
          key={item?.state.id}
          position={new Vector3(i * 2, 0, 0)}
          joyStick={item.joyStick}
          currentUser={item?.state?.id === myPlayer().id}
          state={item.state}
          players={players}
        />
      ))}
    </Fragment>
  );
};

export default Experience;
