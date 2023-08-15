import {useCallback} from "react";
import PropTypes from 'prop-types';
import { Graphics } from "@pixi/react";


export default function QuadTree({quadTree}) {
    const draw = useCallback((g) => {
        g.clear();
        g.lineStyle(1, '#ffffff');
        g.drawRect(quadTree.center.x-quadTree.dimensions.x/2, quadTree.center.y-quadTree.dimensions.y/2, quadTree.dimensions.x, quadTree.dimensions.y);
        const drawQuadRect = (qtt) => {
            g.drawRect(qtt.center.x-qtt.dimensions.x/2, qtt.center.y-qtt.dimensions.y/2, qtt.dimensions.x, qtt.dimensions.y);
            if (qtt.children) {
                for (let i = 0; i < qtt.children.length; i++) {
                    drawQuadRect(qtt.children[i]);
                }
            }
        }
        for (let i = 0; i < quadTree.children.length; i++) {
            drawQuadRect(quadTree.children[i]);
        }
      }, [quadTree]);
    return (
        <Graphics draw={draw} />
    )
}

QuadTree.propTypes = {
    quadTree: PropTypes.object
}