import { speedChange } from "./SandBox"

export default function Settings() {
    return (<div className="settings">
    <p className="settings-title">Settings</p>
    <hr></hr>
    <div className="slider-settings">
        <p className="slider-text">Simulation Speed</p>
        <p className="left-range">1</p>
        <input type="range" max={10} min={-10} step={1} defaultValue={1} onChange={speedChange}/>
        <p className="right-range">-22</p>
    </div>
    </div>)
}