import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Graphics, Stage, useTick, Container } from '@pixi/react';
import {Universe, Planet, Vec2} from "physics"

import '../css/App.scss'
import { Color } from "pixi.js";

let universe = null;

// function PlanetD(props) {
//   const [init, hasInit] = useState(0);
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
//   const [radius, setRadius] = useState(0);
//   const [color, setColor] = useState(0);
//   const [planet, setPlanet] = useState(0);
//   if (init == 0) {
//     hasInit(1)
//     setPlanet(props.planet)
//   }
//   useTick(tick => {
//     let planet2 = planet
//     planet2.pos[0]+=tick*0.5
//     setPlanet(planet2)

//   })
//   setX(planet.pos[0])
//   setY(planet.pos[1])
//   setRadius(planet.radius)
//   setColor(planet.color)
//   const draw = useCallback((g) => {
//     g.clear()
//     g.lineStyle(1);
//     g.beginFill(color, 1);
//     g.drawCircle(x, y, radius);
//     g.endFill();
//   }, [color, radius, x, y]);

//   return <Graphics draw={draw} />
// }
let planetColors = ["#264653", "2A9D8F", "#F4A261", "E76F51", "#277da1", "#43aa8b", "#E9C46A", "#f8961e", "f94144"]
function SolarSystem(props) {
  useEffect(() => {
    let planet = new Planet(new Vec2(Math.random()*props.size[0], Math.random()*props.size[1]), new Vec2(Math.random()-0.5, Math.random()-0.5), 15, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex())
    console.log(planet.get_data())
  }, [])
  const [render, setRender] = useState(0);
  useTick(delta => {
    //console.log("UPDATE")
    setRender(render+1);
    universe.time_step(delta)
  })
  if (universe == null ) {
    if (universe==null) universe = new Universe()
    if (props.random) {
      //universe.planets.push(new Planet([props.size[0]/2, props.size[1]/2], [0, 0], 15, 10000000, new Color("black")))
      for (let i = 0; i < props.randomCount; i++) {
        universe.add_planet(new Planet(new Vec2(Math.random()*props.size[0], Math.random()*props.size[1]), new Vec2(Math.random()-0.5, Math.random()-0.5), 15, 12, new Color(planetColors[Math.floor(planetColors.length * Math.random())]).toHex()).get_data())
      }
    }
  }
  let drawList = []
  let i = 0;
  for (let p of universe.get_planets()) {
    //console.log(p)
    // p = p.get_data() 
    let c = p.color
    let r = p.radius
    let x = p.pos.x
    let y = p.pos.y
    const draw = useCallback((g) => {
      //console.log(planet)
      g.clear()
      g.lineStyle(1);
      g.beginFill(c, 1);
      g.drawCircle(x, y, r);
      g.endFill();
    }, [x, y, c, r]);
    drawList.push(<Graphics key={i} draw={draw} />)
    i++
  }
  //console.log(planetList[0], props)
  return drawList
  // return (
  //   <Container>
  //     <Planet color="yellow" pos={[window.innerWidth*0.95/2, window.innerHeight*0.9/2]} radius={20} velocity={[0, 0]} mass={1000}/>
  //   </Container>
  // )
}


export default function App() {
  return (
    <div>
       <Stage width={window.innerWidth*0.95} height={window.innerHeight*0.9} options={{ backgroundColor: 0x000 }} className="canvas">
            <SolarSystem id="solar-system" random={true} randomCount={10} size={[window.innerWidth*0.95, window.innerHeight*0.9]}/>
       </Stage>
        <div className="home-container">
          <h1 className='top-text'>Gravity Simulation</h1>
          <Link to='/play' className="button">Play</Link>
        </div>
    </div>
  )
}
