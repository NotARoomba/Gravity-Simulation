import numpy as np
import random
import time
import Particle

def genBodies(num, size):
    random.seed(time.time())
    bodies = []
    for i in range(num):
        mass = random.randrange(1000)+1
        # radius = 10*mass*0.00002
        radius = random.randrange(10)+1
        bodies.append(Particle.Particle([random.randrange(size[0]), random.randrange(size[1])], [0, 0], mass, radius, [random.randrange(255), random.randrange(255), random.randrange(255)]))
    return bodies

class Universe:
    def __init__(self, p, size):
        self.particles = p
        self.size = size
    def timeStep(self, dt):
        forces = np.zeros((len(self.particles), 2))
        for i in range(len(self.particles)):
            for j in range(len(self.particles)):
                    forces[i] += self.particles[i].forceFrom(self.particles[j])
        for i in range(len(self.particles)):
            self.particles[i].move(forces[i], dt, self.size)
    def draw(self, screen, clear, cameraPos):
        for particle in self.particles:
            if clear:
                particle.clearPoints()
            particle.draw(screen, cameraPos)
    def getCenter(self):
        pos = [0, 0]
        for i in self.particles:
            pos[0]+=i.pos[0]
            pos[1]+=i.pos[1]
        return np.array(pos) / len(self.particles)

