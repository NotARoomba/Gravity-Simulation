import { Link } from "react-router-dom";
import { Stage } from "@pixi/react";
import SandBox from "./SandBox"
import '../css/App.scss'



export default function App() {
  return (
    <div>
      <Stage width={window.innerWidth*0.95} height={window.innerHeight*0.9} options={{ backgroundColor: 0x000 }} className="canvas">
        <SandBox id="solar-system" random={true} randomCount={10} size={[window.innerWidth*0.95, window.innerHeight*0.9]}/>
        </Stage>
        <div className="home-container">
          <h1 className='top-text'>Gravity Simulation</h1>
          <Link to='/play' className="button">Play</Link>
        </div>
    </div>
  )
}
