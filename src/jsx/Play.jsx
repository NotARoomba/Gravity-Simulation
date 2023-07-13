import { Stage } from "@pixi/react";
import SandBox from "./SandBox"
import Settings from "./Settings"
import { useWindowDimension } from "./useWindowDimension";
import '../css/App.scss'

export default function Play() {
    const [width, height] = useWindowDimension();
    return (
        <div className="play-screen">
        <Stage width={width*0.98} height={height} options={{ backgroundColor: 0x000 }} className="canvas-left">
            <SandBox id="solar-system" random={true} randomCount={25} size={[window.innerWidth*0.85, window.innerHeight]}/>
        </Stage>
        <Settings/>
        </div>
    )
}