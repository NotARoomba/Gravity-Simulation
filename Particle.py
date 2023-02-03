import math
import numpy as np
import pygame
G = 6.67e-4

class Particle:
    def __init__(self, pos, vel, mass, radius, color):
        self.pos = np.array(pos, dtype='float64')
        self.vel = np.array(vel, dtype='float64')
        self.mass = mass
        self.radius = radius
        self.color = color
        self.points = []
    def isColliding(self, particle):
        return (math.sqrt((particle.pos[0] - self.pos[0])**2 + (particle.pos[1] - self.pos[1])**2) <= (particle.radius+self.radius))
    def move(self, force, time, size):
        acceleration = force / self.mass
        self.vel += acceleration * time
        # if (0 > (self.pos[0] + (self.vel[0]*time)) or (self.pos[0] + (self.vel[0]*time)) > size[0]):
        #     self.vel[0] *= -1
        # if (0 > (self.pos[1] + (self.vel[1]*time)) or (self.pos[0] + (self.vel[0]*time)) > size[1]):
        #     self.vel[1] *= -1
        self.points.append(self.pos.tolist())
        self.pos += self.vel * time 
    def forceFrom(self, other):
        delta = math.sqrt(((self.pos[0] - other.pos[0])**2 ) + ((self.pos[1] - other.pos[1])**2))
        if (delta==0):
            return [0, 0]
        elif (self.isColliding(other)):
             return [0, 0]
        dx = self.pos[0]-other.pos[0]
        dy = self.pos[1]-other.pos[1]
        force = (G * self.mass * other.mass) / (delta * delta)
        angle = math.atan2(dy, dx)
        return np.array([force * math.cos(angle), force * math.sin(angle)]) * np.array([-1, -1])
    def draw(self, screen):
        if (len(self.points) >= 2):
            pygame.draw.aalines(screen, [self.color[0], self.color[1], self.color[2], 50], False, self.points)
        pygame.draw.circle(screen, self.color, self.pos, self.radius)
    def __str__(self):
        return str([self.pos, self.vel, self.color, self.mass])
    def __repr__(self):
        return str([self.pos, self.vel, self.color, self.mass])
