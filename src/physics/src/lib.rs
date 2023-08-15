use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use core::ops;
use std::{vec, collections::VecDeque};
extern crate console_error_panic_hook;
use std::panic;

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone, Copy, Debug, PartialEq)]
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
    pub fn distance_from(&self, other: Vec2) -> f64 {
        f64::sqrt(f64::powi(self.x - other.x, 2) + f64::powi(self.y - other.y, 2))
    }
}
impl ops::Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Self) -> Self::Output {
        Vec2 {
            x: self.x + rhs.x,
            y: self.y + rhs.y,
        }
    }
}
impl ops::Sub for Vec2 {
    type Output = Vec2;
    fn sub(self, rhs: Self) -> Self::Output {
        Vec2 {
            x: self.x - rhs.x,
            y: self.y - rhs.y,
        }
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
#[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
pub struct Planet {
    pos: Vec2,
    vel: Vec2,
    radius: i32,
    mass: f64,
    color: String
}
#[wasm_bindgen]
impl Planet {
    #[wasm_bindgen(constructor)]
    pub fn new(position: Vec<f64>, velocity: Vec<f64>, radius: i32, mass: f64, color: String) -> Planet {
        Planet {pos: Vec2::new(position[0], position[1]), vel: Vec2::new(velocity[0], velocity[1]), radius, mass, color}
    }
    pub fn force_from(self, other: &QuadTreeNode, gravity: f64, power: i32) -> Vec2 {
        let delta: f64 = f64::sqrt(f64::powi(self.pos.x - other.center_of_mass.x, 2) + f64::powi(self.pos.y - other.center_of_mass.y, 2));
        // log::info!("{:#?}", other);

        //if delta < 0.7 { return Vec2::new(0.0, 0.0) };

        let dx: f64 = self.pos.x - other.center_of_mass.x;
        let dy: f64 = self.pos.y - other.center_of_mass.y;

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

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct QuadTreeNode {
    mass: f64,
    center_of_mass: Vec2,
    dimensions: Vec2,
    center: Vec2,
    children: Option<[Box<QuadTreeNode>; 4]>,
    planets: Vec<Planet>,
}

// Implement methods for the QuadTreeNode
#[wasm_bindgen]
impl QuadTreeNode {
    fn new(dimensions: Vec2, center: Vec2) -> QuadTreeNode {
        QuadTreeNode {
            mass: 0.0,
            center_of_mass: Vec2::new(0.0, 0.0),
            dimensions,
            center,
            children: None,
            planets: Vec::new(),
        }
    }

    fn add_planet(&mut self, planet: &Planet) {
        //self.mass += planet.mass as f64;
        // self.center_of_mass.x += ((planet.pos.x * planet.mass as f64) + (self.center_of_mass.x * self.mass))/(planet.mass+self.mass);
        // self.center_of_mass.y += ((planet.pos.y * planet.mass as f64) + (self.center_of_mass.y * self.mass))/(planet.mass+self.mass);

        if self.children.is_none() {
            self.planets.push(planet.clone());
            if self.planets.len() > 1 {
                self.subdivide();
            }
        } else {
            let quadrant: usize = self.get_quadrant(planet.pos);
            let child: &mut Box<QuadTreeNode> = &mut self.children.as_mut().unwrap()[quadrant];
            child.add_planet(planet);
        }
    }

    fn subdivide(&mut self) {
        let new_dimensions: Vec2 = Vec2::new(self.dimensions.x / 2.0, self.dimensions.y / 2.0);
        let child_centers: [Vec2; 4] = [
            self.center + Vec2::new(new_dimensions.x / 2.0, new_dimensions.y / 2.0),
            self.center + Vec2::new(-new_dimensions.x / 2.0, new_dimensions.y / 2.0),
            self.center + Vec2::new(-new_dimensions.x / 2.0, -new_dimensions.y / 2.0),
            self.center + Vec2::new(new_dimensions.x / 2.0, -new_dimensions.y / 2.0),
        ];

        let mut children: [Box<QuadTreeNode>; 4] = [
            Box::new(QuadTreeNode::new(new_dimensions, child_centers[0])),
            Box::new(QuadTreeNode::new(new_dimensions, child_centers[1])),
            Box::new(QuadTreeNode::new(new_dimensions, child_centers[2])),
            Box::new(QuadTreeNode::new(new_dimensions, child_centers[3])),
        ];

        for planet in &self.planets {
            let quadrant: usize = self.get_quadrant(planet.pos);
            children[quadrant].add_planet(planet);
        }

        self.children = Some(children);
        self.planets.clear();
    }

    fn get_quadrant(&self, position: Vec2) -> usize {
        if position.x >= self.center.x && position.y >= self.center.y {0}
        else if position.x <= self.center.x && position.y >= self.center.y {1}
        else if position.x <= self.center.x && position.y <= self.center.y {2}
        else {3}
    }
    fn update_center_of_mass(&mut self) {
        if self.planets.len() == 1 {
            self.mass = self.planets[0].mass;
            self.center_of_mass = self.planets[0].pos;
        } else {
            if self.children.is_some() {
                for i in 0..self.children.as_ref().unwrap().len() {
                    let child: &mut Box<QuadTreeNode> = &mut self.children.as_mut().unwrap()[i];
                    child.update_center_of_mass();
                    self.mass += child.mass;
                    self.center_of_mass += child.center_of_mass * child.mass
                }
            }
            self.center_of_mass /= self.mass
        }
    }
    fn rebuild(&mut self, planets: Vec<Planet>) {
        let mut max = Vec2::new(f64::MIN, f64::MIN);
        let mut min = Vec2::new(f64::MAX, f64::MAX);
        *self = QuadTreeNode::new(self.dimensions, self.center);
        for planet in planets {
            if planet.pos.x > max.x { max.x = planet.pos.x; }
            if planet.pos.x < min.x { min.x = planet.pos.x; }
            if planet.pos.y < min.y { min.y = planet.pos.y; }
            if planet.pos.y > max.y { max.y = planet.pos.y; }
            self.add_planet(&planet);
        }
        self.dimensions = max-min;
        self.center = min+(self.dimensions/2.0);    
        self.update_center_of_mass();
    }
    fn find_quads(&self, target: f64, planet: &Planet) -> Vec<QuadTreeNode> {
        let mut queue: VecDeque<&QuadTreeNode> = VecDeque::new();
        let mut values: Vec<QuadTreeNode> = Vec::new();
        queue.push_back(self);

        while let Some(node) = queue.pop_front() {
            let distance: f64 = node.center_of_mass.distance_from(planet.pos);
            let ratio: f64 = node.dimensions.x / distance; // Calculate the ratio

            if ratio < target {
                values.push(node.clone());
            } else {
                if let Some(children) = &node.children {
                    for child in children {
                        queue.push_back(child);
                    }
                }
            }
        }
        values
    }
    
}




#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Universe {
    planets: Vec<Planet>,
    gravity: f64,
    speed: f32,
    mass: f64,
    power: i32,
    quad_tree: QuadTreeNode,
}
#[wasm_bindgen]
impl Universe  {
    #[wasm_bindgen(constructor)]
    pub fn new(width: f64, height: f64) -> Universe {
        panic::set_hook(Box::new(console_error_panic_hook::hook));
        wasm_logger::init(wasm_logger::Config::default());
        log::info!("Universe Init!");

        Universe {planets: Vec::new(), gravity: 6.67e-11, speed: 1.0, mass: 12.0, power: 2, quad_tree: QuadTreeNode::new(Vec2::new(width, height), Vec2::new(width/2.0, height/2.0))}
    }
    pub fn time_step(&mut self, dt: f64) {
        let mut forces: Vec<Vec2> = vec![Vec2::new(0.0, 0.0); self.planets.len()];
        //log::info!("{}", dt);
        for i in 0..self.planets.len() {
            let quads = self.quad_tree.find_quads(0.7, &self.planets[i]);
            if quads.len() == 0 {continue};
            for j in 0..quads.len() {
                forces[i] += self.planets[i].clone().force_from(&quads[j], self.gravity, self.power);
            }
        }
        
        for i in 0..self.planets.len() {
            self.planets[i].move_planet(forces[i], dt * self.speed as f64);
        } 
        self.quad_tree.rebuild(self.planets.clone());
    }
    pub fn reset(&mut self) {
        *self = Universe::new(self.quad_tree.dimensions.x, self.quad_tree.dimensions.y);
    }
    pub fn add_planet(&mut self, planet: JsValue) {
        let planet_t: Planet =  serde_wasm_bindgen::from_value(planet).unwrap();
        self.planets.push(planet_t);        
        self.quad_tree.rebuild(self.planets.clone());

    }
    pub fn remove_planet(&mut self) {
        self.planets.pop();        
        self.quad_tree.rebuild(self.planets.clone());

    }
    pub fn get_planets(&self) -> JsValue {
        //log::info!("{:#?}", self.planets);
        serde_wasm_bindgen::to_value(&self.planets.clone()).unwrap()
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
    pub fn set_mass(&mut self, mass: f64) {
        self.mass = mass;
        for n in &mut self.planets {
            n.mass = mass;
        }
    }
    pub fn get_mass(&self) -> f64 {
        return self.mass;
    }
    pub fn get_quad_tree(&self) -> JsValue {
        serde_wasm_bindgen::to_value(&self.quad_tree).unwrap()
    }
}
 
