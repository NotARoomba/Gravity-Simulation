import { ChangeEvent, useEffect, useState } from "react";
import { useTick } from '@pixi/react';
import { Color } from "pixi.js";
import {Universe, Planet} from "physics-engine/physics_engine"
import BatchGraphics from "../utils/BatchGraphics";
import { SandboxProps, UniverseInfo } from "../utils/Types";

let universe: Universe = new Universe(0, 0);
let info: UniverseInfo;

const planetColors = ["#264653", "2A9D8F", "#F4A261", "E76F51", "#277da1", "#43aa8b", "#E9C46A", "#f8961e", "f94144"]

export default function SandBox({width, height, random, randomCount}: SandboxProps) {
  const [render, setRender] = useState(0);
  useTick(delta => {
    setRender(render+1);
    universe.time_step(delta)
  })
  useEffect(() => {
    universe.set_dimensions(width, height);
    info = {width, height, randomCount: universe.get_planet_count()}
  }, [width, height]);
  if (random && render == 0) {
    //universe.add_planet(new Planet([props.size[0]/2, props.size[1]/2], [0, 0], 15, 1000, new Color("grey").toHex()).get_data())
    for (let i = 0; i < randomCount; i++) {
      universe.add_planet(new Planet(Math.random()*width, Math.random()*height,Math.random()-0.5, Math.random()-0.5, 12, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
    }
  }
  return <BatchGraphics planets={universe.get_planets()} quadTree={null} />;
}
export function changeSpeed(event: ChangeEvent<HTMLInputElement>) {
  if (universe != null) {
    universe.set_speed(parseFloat(event.target.value))
  }
}
export function changeMass(event: ChangeEvent<HTMLInputElement>) {
  if (universe != null) {
    universe.set_mass(parseInt(event.target.value))
  }
}
export function resetSimulation() {
  universe.reset();
  //universe.add_planet(new Planet([nP[0]/2, nP[1]/2], [0, 0], 15, 100000000000000, new Color("grey").toHex()).get_data())
  for (let i = 0; i < info.randomCount; i++) {
    universe.add_planet(new Planet(Math.random()*info.width, Math.random()*info.height,Math.random()-0.5, Math.random()-0.5, 12, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
  }
}
export function changePlanets(event: ChangeEvent<HTMLInputElement>) {
  let {c, w}: {c: number, w: number} = {c: universe.get_planet_count(), w: parseInt(event.target.value)};
  if (w >= c) {
    for (let i = 0; i < (w-c); i++) {
      universe.add_planet(new Planet(Math.random()*info.width, Math.random()*info.height,Math.random()-0.5, Math.random()-0.5, 12, universe.get_mass(), new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
    }
  } else {
    for (let i = 0; i < (c-w); i++) {
      universe.remove_planet();
    }
  }
}
export function changeGravity(event: ChangeEvent<HTMLInputElement>) {
    universe.set_gravity(parseFloat(event.target.value))
}
export function changeTheta(event: ChangeEvent<HTMLInputElement>) {
    universe.set_theta(parseFloat(event.target.value))
}