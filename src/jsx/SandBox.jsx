import { useState } from "react";
import PropTypes from 'prop-types';
import { useTick } from '@pixi/react';
import { Color } from "pixi.js";

import {Universe, Planet, Vec2} from "physics-engine"

import Ball from "./Ball";


let universe = null;

let planetColors = ["#264653", "2A9D8F", "#F4A261", "E76F51", "#277da1", "#43aa8b", "#E9C46A", "#f8961e", "f94144"]

export default function SandBox(props) {
  const [render, setRender] = useState(0);
  useTick(delta => {
    //console.log("UPDATE")
    setRender(render+1);
    universe.time_step(delta)
  })
  if (universe == null ) {
    if (universe==null) universe = new Universe()
    if (props.random) {
      universe.add_planet(new Planet(new Vec2(props.size[0]/2, props.size[1]/2), new Vec2(0, 0), 15, 10000000, new Color("black").toHex()).get_data())
      for (let i = 0; i < props.randomCount; i++) {
        universe.add_planet(new Planet(new Vec2(Math.random()*props.size[0], Math.random()*props.size[1]), new Vec2(Math.random()-0.5, Math.random()-0.5), 15, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
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

SandBox.propTypes = {
  random: PropTypes.bool,
  size: PropTypes.array,
  randomCount: PropTypes.number
}