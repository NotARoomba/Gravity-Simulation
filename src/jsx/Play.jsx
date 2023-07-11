import { Stage } from "@pixi/react";
import SandBox from "./SandBox"
import Settings from "./Settings"
import '../css/App.scss'

export default function Play() {
    return (
        <div className="play-screen">
        <Stage width={window.innerWidth*0.8} height={window.innerHeight} options={{ backgroundColor: 0x000 }} className="canvas-left">
            <SandBox id="solar-system" random={true} randomCount={25} size={[window.innerWidth*0.85, window.innerHeight]}/>
        </Stage>
        <Settings/>
        </div>
    )
}