use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use core::ops;


const GRAVITY: f64 = 6.67e-11 as f64;
#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
#[derive(Clone, Copy)]
pub struct Vec2 {
    x: f64,
    y: f64
}
#[wasm_bindgen]
impl Vec2 {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64) -> Vec2 {
        Vec2 {x: x, y: y}
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

#[derive(Serialize, Deserialize, Clone)]
#[wasm_bindgen]
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
    pub fn new(position: Vec2, velocity: Vec2, radius: i32, mass: i32, color: String) -> Planet {
        Planet {pos: position, vel: velocity, radius: radius, mass: mass, color: color}
    }
    pub fn force_from(self, other: &Planet) -> Vec2 {
        let delta = f64::sqrt(f64::powi(self.pos.x - other.pos.x, 2) + f64::powi(self.pos.y - other.pos.y, 2));

        if delta == 0.0 { return Vec2::new(0.0, 0.0) };

        let dx = self.pos.x - other.pos.x;
        let dy = self.pos.y - other.pos.y;

        let f = (GRAVITY * self.mass as f64 * other.mass as f64) / (delta * delta);

        let angle = f64::atan2(dy, dx);

        let mut force = Vec2::new(f * f64::cos(angle) * -1.0, f * f64::sin(angle) * -1.0);

        let l = f64::sqrt((force.x * force.x) + (force.y * force.y));

        force/=l;

        return force;
    }
    pub fn move_planet(&mut self, force: Vec2, time: f64) {
        let acceleration = Vec2::new(force.x / self.mass as f64 / f64::sqrt((force.x * force.x) + (force.y * force.y)), force.y / self.mass as f64 / f64::sqrt((force.x * force.x) + (force.y * force.y)));

        self.vel += acceleration * time;

        self.pos += self.vel * time;
    }
    pub fn get_data(&self) -> JsValue {
        return serde_wasm_bindgen::to_value(&self).unwrap();
    }
}
#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Universe {
    planets: Vec<Planet>,
}
#[wasm_bindgen]
impl Universe  {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Universe {
        Universe {planets: Vec::new()}
    }
    pub fn time_step(&mut self, dt: f64) {
        let mut forces: Vec<Vec2> = vec![Vec2::new(0.0, 0.0); self.planets.len()];
        for i in 0..self.planets.len() {
            for j in 0..self.planets.len() {
                forces[i] += self.planets[i].clone().force_from(&self.planets[j]);
            }
        }
        for i in 0..self.planets.len() {
            self.planets[i].move_planet(forces[i], dt);
        } 
    }
    pub fn add_planet(&mut self, planet: JsValue) {
        let planet_t: Planet =  serde_wasm_bindgen::from_value(planet).unwrap();
        self.planets.push(planet_t);
    }
    pub fn get_planets(&self) -> JsValue {
        return serde_wasm_bindgen::to_value(&self.planets).unwrap();
    }
}
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}
