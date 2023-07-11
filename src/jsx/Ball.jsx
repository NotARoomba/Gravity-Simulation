import {useCallback} from "react";
import PropTypes from 'prop-types';
import { Graphics } from "@pixi/react";

export default function Ball({planet}) {
    const draw = useCallback((g) => {
        g.clear()
        g.lineStyle(1);
        g.beginFill(planet.color, 1);
        g.drawCircle(planet.pos.x, planet.pos.y, planet.radius);
        g.endFill();
      }, [planet]);
    return (
        <Graphics draw={draw} />
    )
}

Ball.propTypes = {
    planet: PropTypes.object
}