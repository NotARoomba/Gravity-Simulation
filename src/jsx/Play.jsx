import { useApp, PixiComponent, Stage } from '@pixi/react';
import { EventSystem } from "@pixi/events";
import { Viewport as PixiViewport } from "pixi-viewport";
import SandBox from "./SandBox"
import Settings from "./Settings"
import { useWindowDimension } from "./useWindowDimension";
import '../css/App.scss'



const Viewport = (props) => {
    const app = useApp()
    return <PixiComponentViewport app={app} {...props} />
  }
  
  const PixiComponentViewport = PixiComponent('Viewport', {
    create: (props) => {
      if (!("events" in props.app.renderer))
        props.app.renderer.addSystem(EventSystem, "events");
  
      const { width, height } = props;
      const { ticker } = props.app;
      const { events } = props.app.renderer;
  
      const viewport = new PixiViewport({
        screenWidth: width,
        screenHeight: height,
        worldWidth: width,
        worldHeight: height,
        ticker: ticker,
        events: events,
      });
  
      viewport
        .drag({pressDrag: true}).decelerate({friction: 0.95,              // percent to decelerate after movement
        bounce: 0.8,                 // percent to decelerate when past boundaries (only applicable when viewport.bounce() is active)
        minSpeed: 0.01, }).pinch().wheel();
  
      return viewport
    },
  })

export default function Play() {
    const [width, height] = useWindowDimension();
    return (
        <div className="play-screen">
        <Stage width={width*0.98} height={height} options={{ backgroundColor: 0x000 }} className={"canvas-left"} onPointerDown={() => document.getElementById("root").style.cursor = "grab"} onPointerUp={() => document.getElementById("root").style.cursor = "auto"}>
            <Viewport width={window.innerWidth*0.85} height={window.innerHeight}>
                <SandBox id="solar-system" random={true} randomCount={25} size={[window.innerWidth*0.85, window.innerHeight]}/>
            </Viewport>
        </Stage>
        <Settings/>
        </div>
    )
}