use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use core::ops;
use std::vec;

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone, Copy, Default)]
pub struct Vec2 {
    x: f64,
    y: f64
}
#[wasm_bindgen]
impl Vec2 {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64) -> Vec2 {
        Vec2 {x, y}
    }
    pub fn divide(&mut self, n: f64) {
        self.x = self.x/n;
        self.y = self.y/n;
    }
}
impl ops::AddAssign for Vec2 {
    fn add_assign(&mut self, other: Self) {
        *self = Self {
            x: self.x + other.x,
            y: self.y + other.y,
        };
    }
}
impl ops::DivAssign<f64> for Vec2 {
    fn div_assign(&mut self, d: f64) {
        self.x /= d;
        self.y /= d;
    }
}
impl ops::Mul<f64> for Vec2 {
    type Output = Self;
    fn mul(self, m: f64) -> Self {
        Self::new(self.x*m, self.y*m)
    }
}
impl ops::Div<f64> for Vec2 {
    type Output = Self;
    fn div(self, m: f64) -> Self {
        Self::new(self.x/m, self.y/m)
    }
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone, Default)]
pub struct Planet {
    pos: Vec2,
    vel: Vec2,
    radius: i32,
    mass: i32,
    color: String
}
#[wasm_bindgen]
impl Planet {
    #[wasm_bindgen(constructor)]
    pub fn new(position: Vec<f64>, velocity: Vec<f64>, radius: i32, mass: i32, color: String) -> Planet {
        Planet {pos: Vec2::new(position[0], position[1]), vel: Vec2::new(velocity[0], velocity[1]), radius, mass, color}
    }
    pub fn force_from(self, other: &Planet, gravity: f64, power: i32) -> Vec2 {
        let delta: f64 = f64::sqrt(f64::powi(self.pos.x - other.pos.x, 2) + f64::powi(self.pos.y - other.pos.y, 2));

        if delta == 0.0 { return Vec2::new(0.0, 0.0) };

        let dx: f64 = self.pos.x - other.pos.x;
        let dy: f64 = self.pos.y - other.pos.y;

        let f: f64 = -1.0 * (gravity * self.mass as f64 * other.mass as f64) * f64::powi(delta, power);

        let angle: f64 = f64::atan2(dy, dx);

        let mut force: Vec2 = Vec2::new(f * f64::cos(angle), f * f64::sin(angle));

        let l: f64 = f64::sqrt((force.x * force.x) + (force.y * force.y));

        force/=l;

        force        
    }
    pub fn move_planet(&mut self, force: Vec2, time: f64) {
        let delta: f64 = f64::sqrt(f64::powi(force.x, 2) + f64::powi(force.y, 2));

        let acceleration: Vec2 = (force/self.mass as f64)/delta;

        self.vel += acceleration * time;

        self.pos += self.vel * time;
    }
    pub fn get_data(&self) -> JsValue {
        serde_wasm_bindgen::to_value(&self).unwrap()
    }
}

pub struct QuadTree {
	mass: i32,
	dimensions: Vec2,
	center: Vec2,
	center_of_mass: Vec2,
	is_leaf: bool,
	planets: Vec<Planet>,
	children: Vec<QuadTree>,
}
impl QuadTree {
	pub fn new(dimensions: Vec2, center: Vec2, quadrant: i32) -> QuadTree {
		QuadTree {mass: 0, dimensions, center, quadrant, center_of_mass: Vec2::new(0.0, 0.0), is_leaf: true, planets: Vec::new(), children: Vec::new()}
	}
	pub fn add_planet(&mut self, planet: Planet) {
		//first check how many planets are in the QuaTree
		//then if there are no planets ad the planet and return
		//if there is a planet make a leaf false and then add 4 children and then find out the correct child that the planet should go in
		//check if is a leaf and if so just set the planet
		if self.is_leaf && self.planets.len() == 0 {
			self.mass += planet.mass;
			self.center_of_mass = planet.pos;
			self.planets.push(planet);
			return;
		} else {
			self.is_leaf = false;
			for i in  0..4 {
				self.children.push(QuadTree::new(Vec2::new(self.dimensions.x/2.0, self.dimensions.y/2.0), Vec2::new(self.center.x + (i32::pow(-1, i+2) as f64 *(self.dimensions.x/4.0), self.center.y + (i32::pow(-1, i+2) as f64 * (self.dimensions.y/4))), i+1));
			}
			//need to call add planet in the right quadrant 
		}
		// determine quadrant
		let quadrant: Vec2 = Vec2::new(if planet.pos.x <= 0.0 {-1.0} else {1.0}, if planet.pos.y <= 0.0 {-1.0} else {1.0});
		
	} 
}


#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Universe {
    planets: Vec<Planet>,
    gravity: f64,
    speed: f32,
    mass: i32,
    power: i32,
}
#[wasm_bindgen]
impl Universe  {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Universe {
        Universe {planets: Vec::new(), gravity: 6.67e-11, speed: 1.0, mass: 12, power: 2}
    }
    pub fn time_step(&mut self, dt: f64) {
        let mut forces: Vec<Vec2> = vec![Vec2::new(0.0, 0.0); self.planets.len()];
        for i in 0..self.planets.len() {
            for j in 0..self.planets.len() {
                forces[i] += self.planets[i].clone().force_from(&self.planets[j], self.gravity, self.power);
            }
        }
        for i in 0..self.planets.len() {
            self.planets[i].move_planet(forces[i], dt*self.speed as f64);
        } 
    }
    pub fn reset(&mut self) {
        *self = Universe::new();
    }
    pub fn add_planet(&mut self, planet: JsValue) {
        let planet_t: Planet =  serde_wasm_bindgen::from_value(planet).unwrap();
        self.planets.push(planet_t);
    }
    pub fn remove_planet(&mut self) {
        self.planets.pop();
    }
    pub fn get_planets(&self) -> JsValue {
        return serde_wasm_bindgen::to_value(&self.planets).unwrap();
    }
    pub fn set_gravity(&mut self, gravity: f64) {
        self.gravity = gravity;
    }
    pub fn get_gravity(&self) -> f64 {
        return self.gravity;
    }
    pub fn set_speed(&mut self, speed: f32) {
        self.speed = speed;
    }
    pub fn get_speed(&self) -> f32 {
        return self.speed;
    }
    pub fn set_power(&mut self, power: i32) {
        self.power = power;
    }
    pub fn get_power(&self) -> i32 {
        return self.power;
    }
    pub fn set_mass(&mut self, mass: i32) {
        self.mass = mass;
        for n in &mut self.planets {
            n.mass = mass;
        }
    }
    pub fn get_mass(&self) -> i32 {
        return self.mass;
    }
}
 
