import { changeSpeed, changeMass, resetSimulation, changePlanets, changeTheta } from "./SandBox"
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Settings() {
    const [isOpen, setIsOpen] = useState(true);
    return (
    <AnimatePresence>
        <div className={isOpen?"absolute flex right-0 top-0":"absolute flex right-[-18vw] top-0"} id="settings-div">
    <div className="settings-button-div">
        <button className="justify-center bg-[rgba(0,0,0,0)] transition-all duration-[0.5s] ease-[cubic-bezier(0.47,0,0.745,0.715)] m-2.5 rounded-[10px] border-[rgba(0,0,0,0)] hover:cursor-pointer hover:invert-[49%] hover:sepia-[82%] hover:saturate-[1121%] hover:hue-rotate-[331deg] hover:brightness-[100%] hover:contrast-[82%];" onClick={() => setIsOpen(!isOpen)}><img className="invert-[97%] sepia-[70%] saturate-[0%] hue-rotate-[234deg] brightness-[113%] contrast-[86%] w-[max(3vw,3vh)]" src={isOpen?"/assets/x.svg":"/assets/settings.svg"}></img></button>
    </div>
    <div className="bg-[#121212] w-full rounded-tr-none rounded-br-none rounded-[35px] align-middle">
    <p className="text-[4vw] font-bold m-2.5">Settings</p>
    <hr className="text-neutral-200 w-9/12 mb-2.5 align-middle"></hr>
    <div className="align-middle">
        {/* <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Gravity (G*m1*m2)/(r^n)</p>
        <p className="inline-block w-[30px] text-center p-px" id="red-too">1</p>
        <input type="range" max={1000} min={1} step={1} defaultValue={2} onChange={changeGravity}/>
        <p className="inline-block w-[30px] text-center p-px">1000</p> */}
        <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Simulation Speed</p>
        <p className="inline-block w-[30px] text-center p-px" id="red-too">-10</p>
        <input type="range" max={10} min={-10} step={0.1} defaultValue={1} onChange={changeSpeed}/>
        <p className="inline-block w-[30px] text-center p-px">10</p>
        <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Planet Mass</p>
        <p className="inline-block w-[30px] text-center p-px">1</p>
        <input type="range" max={1000} min={1} step={10} defaultValue={10} onChange={changeMass}/>
        <p className="inline-block w-[30px] text-center p-px">1000</p>
        <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Number of Planets</p>
        <p className="inline-block w-[30px] text-center p-px">2</p>
        <input type="range" max={2000} min={2} step={1} defaultValue={25} onChange={changePlanets}/>
        <p className="inline-block w-[30px] text-center p-px">2000</p>
        <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Theta</p>
        <p className="inline-block w-[30px] text-center p-px">0.1</p>
        <input type="range" max={3} min={0.1} step={0.1} defaultValue={0.5} onChange={changeTheta}/>
        <p className="inline-block w-[30px] text-center p-px">3</p>
    </div>
    <p>Use the mouse/scrollwheel to move/zoom!</p>
    <button className="text-neutral-200 bg-[#2f2f2f] text-[max(1vw,1vh)] mb-5 rounded-lg" onClick={resetSimulation}>RESET SIMULATION</button>
    </div></div></AnimatePresence>)
}
