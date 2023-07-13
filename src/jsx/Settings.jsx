import { gravityChange } from "./SandBox"

export default function Settings() {
    return (<div className="settings">
    <p className="settings-title">Settings</p>
    <hr></hr>
    <div className="slider-settings">
        <p className="slider-text">Gravitational Constant</p>
        <p className="left-range">1</p>
        <input type="range" max={23} min={-1} step={1} defaultValue={11} onChange={gravityChange}/>
        <p className="right-range">-22</p>
    </div>
    </div>)
}