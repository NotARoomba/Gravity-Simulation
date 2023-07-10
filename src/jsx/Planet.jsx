import Universe from "./Universe";

export default class Planet {
    constructor(position, velocity, radius, mass, color) {
      this.pos = position;
      this.vel = velocity;
      this.radius = radius;
      this.mass = mass;
      this.color = color;
      this.points = []
    }
    isColliding(particle) {
        return Math.sqrt(Math.pow(particle.pos[0] - this.pos[0], 2) + Math.pow(particle.pos[1] - this.pos[1], 2)) <= (particle.radius + this.radius);
      }
      
    forceFrom(other) {
        var delta = Math.sqrt(Math.pow(this.pos[0] - other.pos[0], 2) + Math.pow(this.pos[1] - other.pos[1], 2));
        
        if (delta == 0) {
          return [0, 0];
        }
        //console.log(delta)
        //console.log(this.pos, other.pos)
        var colliding = (!this.isColliding(other) ? -1 : 1);
        var dx = this.pos[0] - other.pos[0];
        var dy = this.pos[1] - other.pos[1];
        var force = (Universe.G * this.mass * other.mass) / (delta * delta);
        // console.log(this.mass, other.mass, Universe.G, delta)
        var angle = Math.atan2(dy, dx);
        force = [force * Math.cos(angle), force * Math.sin(angle)]
        force = force.map(x => x * colliding);
        var l = Math.sqrt((force[0] * force[0]) + (force[1] * force[1]));
        force = [force[0] / l, force[1] / l];
        return force;
      }
      move(force, time) {
        var acceleration = force.map((i => i / this.mass / Math.sqrt((force[0] * force[0]) + (force[1] * force[1]) + 0.15)));
        this.vel[0] += acceleration[0]*time;
        this.vel[1] += acceleration[1]*time;
        // if (this.points.length >= 150) {
        //   this.points.shift();
        // }
        // this.points.push([...this.pos]);
        this.pos[0] += this.vel[0] * time;
        this.pos[1] += this.vel[1] * time;
      }
  }
  