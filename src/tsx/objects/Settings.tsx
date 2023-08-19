import { changeSpeed, changeMass, resetSimulation, changePlanets, changeTheta } from "./SandBox"
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Settings() {
    // TODO: have settings to set the current number of planets to have random masses and sizes
    // TODO: toggle quadtree visibility and add and remove theta when needed
    const [isOpen, setIsOpen] = useState(true);
    return (
    <AnimatePresence>
        <div className={"absolute flex flex-col text-neutral-300 bg-neutral-900 w-screen h-32" + (isOpen?" bottom-0":" bottom-[-18vw]")}>
            <p className="flex text-xl text-center justify-center">Settings</p>
            </div></AnimatePresence>)
}


// OLD
// <div className="bg-[#121212] w-full rounded-tr-none rounded-br-none rounded-[35px] align-middle">
//     <p className="text-[4vw] font-bold m-2.5">Settings</p>
//     <hr className="text-neutral-200 w-9/12 mb-2.5 align-middle"></hr>
//     <div className="align-middle">
//         {/* <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Gravity (G*m1*m2)/(r^n)</p>
//         <p className="inline-block w-[30px] text-center p-px" id="red-too">1</p>
//         <input type="range" max={1000} min={1} step={1} defaultValue={2} onChange={changeGravity}/>
//         <p className="inline-block w-[30px] text-center p-px">1000</p> */}
//         <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Simulation Speed</p>
//         <p className="inline-block w-[30px] text-center p-px" id="red-too">-10</p>
//         <input type="range" max={10} min={-10} step={0.1} defaultValue={1} onChange={changeSpeed}/>
//         <p className="inline-block w-[30px] text-center p-px">10</p>
//         <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Planet Mass</p>
//         <p className="inline-block w-[30px] text-center p-px">1</p>
//         <input type="range" max={1000} min={1} step={10} defaultValue={10} onChange={changeMass}/>
//         <p className="inline-block w-[30px] text-center p-px">1000</p>
//         <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Number of Planets</p>
//         <p className="inline-block w-[30px] text-center p-px">2</p>
//         <input type="range" max={2000} min={2} step={1} defaultValue={25} onChange={changePlanets}/>
//         <p className="inline-block w-[30px] text-center p-px">2000</p>
//         <p className="text-[max(1.5vw,1.5vh)] font-semibold my-0">Theta</p>
//         <p className="inline-block w-[30px] text-center p-px">0.1</p>
//         <input type="range" max={3} min={0.1} step={0.1} defaultValue={0.5} onChange={changeTheta}/>
//         <p className="inline-block w-[30px] text-center p-px">3</p>
//     </div>