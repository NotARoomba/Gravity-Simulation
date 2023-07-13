import { changeSpeed, changeMass, resetSimulation, changePlanets } from "./SandBox"

export default function Settings() {
    return (<div className="settings">
    <p className="settings-title">Settings</p>
    <hr></hr>
    <div className="slider-settings">
        <p className="slider-text">Simulation Speed</p>
        <p className="left-range" id="red-too">-10</p>
        <input type="range" max={10} min={-10} step={0.1} defaultValue={1} onChange={changeSpeed}/>
        <p className="right-range">10</p>
        <p className="slider-text">Planet Mass</p>
        <p className="left-range">1</p>
        <input type="range" max={250} min={1} step={1} defaultValue={1} onChange={changeMass}/>
        <p className="right-range">250</p>
        <p className="slider-text">Number of Planets</p>
        <p className="left-range">2</p>
        <input type="range" max={250} min={2} step={1} defaultValue={1} onChange={changePlanets}/>
        <p className="right-range">250</p>
    </div>
    <button className="reset-button" onClick={resetSimulation}>RESET SIMULATION</button>
    </div>)
}