import { SliderProps } from "../utils/Types";

export default function Slider({min, max, step, defaultValue, title, func}: SliderProps) {
    return (<div className="w-full pb-5 mb-10 snap-center"><p className="text-2xl font-semibold my-0">{title}</p>
    <p className="inline-block w-[30px] text-center p-px">{min}</p>
    <input type="range" max={max} min={min} step={step} defaultValue={defaultValue} onChange={func}/>
    <p className="inline-block w-[30px] text-center p-px">{max}</p>
    </div>)
}