import { Link } from "react-router-dom";
import { Stage } from "@pixi/react";
import SandBox from "../objects/SandBox"
import { useWindowDimension } from "../utils/useWindowDimension";
import { Vec2 } from "physics-engine/physics_engine";


export default function Error() {
  const [width, height] = useWindowDimension();
  return (
    <div>
      <Stage width={width} height={height} options={{ backgroundColor: 0x000 }} className="canvas">
        <SandBox random={true} randomCount={25} dimensions={new Vec2(width, height)}/>
        </Stage>
        <div className="fixed -translate-x-1/2 -translate-y-1/3 left-1/2 top-1/3">
          <h1 className='text-9xl font-semibold mb-12'>404</h1>
          <Link to='/' className="no-underline bg-black text-neutral-200 text-6xl font-extrabold shadow-black outline-white/0.5 outline-offset-0 transition-all duration-[1250ms] ease-[cubic-bezier(0.19,1,0.22,1)] px-32 py-2.5 border-0 border-solid hover:border hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.2)] hover:outline-white hover:outline-offset-8 hover:border-solid outline">Home</Link>
        </div>
    </div>
  )
}