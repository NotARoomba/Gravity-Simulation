import { Link } from "react-router-dom";
import { Stage } from "@pixi/react";
import SandBox from "./SandBox"
import { useWindowDimension } from "./useWindowDimension";
import '../css/App.scss'


export default function Home() {
  const [width, height] = useWindowDimension();
  return (
    <div>
      <Stage width={width*0.95} height={height*0.9} options={{ backgroundColor: 0x000 }} className="canvas">
        <SandBox id="solar-system" random={true} randomCount={25} size={[window.innerWidth*0.95, window.innerHeight*0.9]}/>
        </Stage>
        <div className="home-container">
          <h1 className='top-text'>Gravity Simulation</h1>
          <Link to='/play' className="button">Play</Link>
        </div>
        <div className="links">
          <Link className="link" onClick={() => window.location.href = "https://notaroomba.xyz"}>Website</Link>
          <p>•</p>
          <p>NotARoomba</p>
          <p>•</p>
          <Link className="link" onClick={() => window.location.href = "https://github.com/NotARoomba/Gravity-Simulation"}>GitHub</Link>
        </div>
    </div>
  )
}
