import { useEffect, useState } from "react";
import { SliderProps, accentColors } from "../utils/Types";

export default function Slider({
  min,
  max,
  step,
  defaultValue,
  title,
  func,
}: SliderProps) {
  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(accentColors[Math.floor(Math.random() * accentColors.length)]);
  }, []);
  return (
    <div className="w-full pb-5 snap-center">
      <p className="text-2xl font-semibold my-0">{title}</p>
      <p className="inline-block w-[30px] text-center p-px">{min}</p>
      <input
        type="range"
        className={color}
        max={max}
        min={min}
        step={step}
        defaultValue={defaultValue}
        onChange={func}
      />
      <p className="inline-block w-[30px] text-center p-px">{max}</p>
    </div>
  );
}
