import { useState } from "react";
import PropTypes from 'prop-types';
import { useTick } from '@pixi/react';
import { Color } from "pixi.js";

import {Universe, Planet} from "physics-engine"

import Ball from "./Ball";


let universe = null;
let nP = []

let planetColors = ["#264653", "2A9D8F", "#F4A261", "E76F51", "#277da1", "#43aa8b", "#E9C46A", "#f8961e", "f94144"]

export default function SandBox(props) {
  const [render, setRender] = useState(0);
  useTick(delta => {
    setRender(render+1);
    universe.time_step(delta)
  })
  if (universe == null ) {
    if (universe==null) universe = new Universe()
    if (props.random) {
      nP = [...props.size, props.randomCount];
      //universe.add_planet(new Planet([props.size[0]/2, props.size[1]/2], [0, 0], 15, 100000000000000, new Color("grey").toHex()).get_data())
      for (let i = 0; i < props.randomCount; i++) {
        universe.add_planet(new Planet([Math.random()*props.size[0], Math.random()*props.size[1]],[Math.random()-0.5, Math.random()-0.5], 15, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
      }
    }
  }
  let drawList = []
  let i = 0;
  for (let p of universe.get_planets()) {
    drawList.push(<Ball key={i} planet={p} />)
    i++
  }
  return drawList
}
export function changeSpeed(event) {
  if (universe != null) {
    universe.set_speed(event.target.value)
  }
}
export function changeMass(event) {
  if (universe != null) {
    universe.set_mass(event.target.value)
  }
}
export function resetSimulation() {
  universe.reset();
  //universe.add_planet(new Planet([nP[0]/2, nP[1]/2], [0, 0], 15, 100000000000000, new Color("grey").toHex()).get_data())
  for (let i = 0; i < nP[2]; i++) {
    universe.add_planet(new Planet([Math.random()*nP[0], Math.random()*nP[1]],[Math.random()-0.5, Math.random()-0.5], 15, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
  }
}
export function changePlanets(event) {
  let {c, w} = {c: universe.get_planets().length, w: parseInt(event.target.value)};
  if (w >= c) {
    for (let i = 0; i < (w-c); i++) {
      universe.add_planet(new Planet([Math.random()*nP[0], Math.random()*nP[1]],[Math.random()-0.5, Math.random()-0.5], 15, universe.get_mass(), new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
    }
  } else {
    for (let i = 0; i < (c-w); i++) {
      universe.remove_planet();
    }
  }
}
export function changeGravity(event) {
  if (universe != null) {
    universe.set_power(event.target.value)
    console.log(universe.get_power())
  }
}
SandBox.propTypes = {
  random: PropTypes.bool,
  size: PropTypes.array,
  randomCount: PropTypes.number
}