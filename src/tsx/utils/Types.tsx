import { Vec2 } from "physics-engine";

export interface SandboxProps {
    random: boolean;
    width: number;
    height: number;
    randomCount: number;
}
export interface BatchGraphicsProps {
    planets: Array<PlanetProps>;
    quadTree: QuadTreeProps | null;

}

export interface UniverseInfo {
    width: number;
    height: number;    
    randomCount: number;
}

export interface PlanetProps {
    mass: number;
    radius: number;
    color: string;
    pos: Vec2;

}
export interface QuadTreeProps {
    mass: number;
    center: Vec2;
    center_of_mass: Vec2;
    dimensions: Vec2;
    children: Array<QuadTreeProps>;
    planets: Array<PlanetProps>
}

export interface UniverseProp {
    time_step: (dt:number) => void;
    reset: () => void;
    get_quad_tree: () => QuadTreeProps;
    add_planet: (planet: PlanetProps) => void;
    remove_planet: () => void;
    get_planets: () => Array<PlanetProps>;
    //gravity
    get_gravity: () => number;
    set_gravity: (gravity: number) => void;
    //speed
    get_speed: () => number;
    set_speed: (speed: number) => void;
    //power (unused)
    get_power: () => number;
    set_power: (power: number) => void;
    //mass
    get_mass: () => number;
    set_mass: (mass: number) => void;
    //theta
    set_theta: () => number;
}