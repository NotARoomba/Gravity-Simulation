import { ChangeEvent, useState } from "react";
import { useTick } from '@pixi/react';
import { Color } from "pixi.js";
import {Universe, Planet, Vec2} from "physics-engine/physics_engine"
import BatchGraphics from "../utils/BatchGraphics";
import { SandboxProps, UniverseInfo } from "../utils/Types";

let universe: Universe;
let info: UniverseInfo;

const planetColors = ["#264653", "2A9D8F", "#F4A261", "E76F51", "#277da1", "#43aa8b", "#E9C46A", "#f8961e", "f94144"]

export default function SandBox({dimensions, random, randomCount}: SandboxProps) {
  const [render, setRender] = useState(0);
  useTick(delta => {
    setRender(render+1);
    universe.time_step(delta)
  })
  if (universe == null ) {
    universe = new Universe(dimensions)
    if (random) {
      
      //universe.add_planet(new Planet([props.size[0]/2, props.size[1]/2], [0, 0], 15, 1000, new Color("grey").toHex()).get_data())
      for (let i = 0; i < randomCount; i++) {
        universe.add_planet(new Planet(new Vec2(Math.random()*dimensions.x, Math.random()*dimensions.y),new Vec2(Math.random()-0.5, Math.random()-0.5), 12, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
      }
    }
  }
  return <BatchGraphics planets={universe?.get_planets()} quadTree={universe?.get_quad_tree()} />;
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
    universe.add_planet(new Planet(new Vec2(Math.random()*info.dimensions.x, Math.random()*info.dimensions.y),new Vec2(Math.random()-0.5, Math.random()-0.5), 12, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
  }
}
export function changePlanets(event: ChangeEvent<HTMLInputElement>) {
  let {c, w} = {c: universe.get_planets().length, w: parseInt(event.target.value)};
  if (w >= c) {
    for (let i = 0; i < (w-c); i++) {
      universe.add_planet(new Planet(new Vec2(Math.random()*info.dimensions.x, Math.random()*info.dimensions.y),new Vec2(Math.random()-0.5, Math.random()-0.5), 12, universe.get_mass(), new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
    }
  } else {
    for (let i = 0; i < (c-w); i++) {
      universe.remove_planet();
    }
  }
}
export function changeGravity(event: ChangeEvent<HTMLInputElement>) {
  if (universe != null) {
    universe.set_gravity(parseFloat(event.target.value))
    //console.log(universe.get_power())
  }
}
export function changeTheta(event: ChangeEvent<HTMLInputElement>) {
  if (universe != null) {
    universe.set_theta(parseFloat(event.target.value))
    //console.log(universe.get_power())
  }
}