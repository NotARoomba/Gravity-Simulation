export default class Universe {
    static G = 6.67e-1
    constructor() {
        this.planets = []
    }
    timeStep(dt) {
        var forces = []
        for (let i = 0; i < this.planets.length; i++) {
            forces.push([i-i, i-i]);
        }
        for (let i = 0; i < this.planets.length; i++) {
            for (let j = 0; j < this.planets.length; j++) {
                let force = this.planets[i].forceFrom(this.planets[j])
                forces[i][0] += force[0];
                forces[i][1] += force[1];
            }
        }
        //console.log(forces)
        
        for (let i = 0; i < this.planets.length; i++) {
            this.planets[i].move(forces[i], dt);
        }
    }
}