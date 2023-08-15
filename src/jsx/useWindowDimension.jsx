import { useState, useEffect } from "react";

export function useWindowDimension() {
  const [dimensions, setDimensions] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const handleResize = () => {
    setDimensions([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  return dimensions;
}
