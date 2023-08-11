import { changeSpeed, changeMass, resetSimulation, changePlanets } from "./SandBox"

export default function Settings() {
    let isOpen = false
    return (<div className={"entire-settings-closed"} id="settings-div">
    <div className="settings-button-div">
        <button className="settings-button" onClick={() => {isOpen=!isOpen;$("#settings-div")[0].className = (isOpen?"entire-settings-open":"entire-settings-closed"); $("#settings-img")[0].src = (isOpen?"/assets/x.svg":"/assets/settings.svg")}}><img id="settings-img" src={"/assets/settings.svg"}></img></button>
    </div>
    <div className="settings">
    <p className="settings-title">Settings</p>
    <hr></hr>
    <div className="slider-settings">
        {/* <p className="slider-text">Gravity (G*m1*m2)/(r^n)</p>
        <p className="left-range" id="red-too">1</p>
        <input type="range" max={1000} min={1} step={1} defaultValue={2} onChange={changeGravity}/>
        <p className="right-range">1000</p> */}
        <p className="slider-text">Simulation Speed</p>
        <p className="left-range" id="red-too">-10</p>
        <input type="range" max={10} min={-10} step={0.1} defaultValue={1} onChange={changeSpeed}/>
        <p className="right-range">10</p>
        <p className="slider-text">Planet Mass</p>
        <p className="left-range">1</p>
        <input type="range" max={250} min={1} step={1} defaultValue={12} onChange={changeMass}/>
        <p className="right-range">250</p>
        <p className="slider-text">Number of Planets</p>
        <p className="left-range">2</p>
        <input type="range" max={250} min={2} step={1} defaultValue={1} onChange={changePlanets}/>
        <p className="right-range">250</p>
    </div>
    <p>Use the mouse/scrollwheel to move/zoom!</p>
    <button className="reset-button" onClick={resetSimulation}>RESET SIMULATION</button>
    </div></div>)
}