import Particle
import Universe
import sys, pygame
import numpy as np
size = width, height = 1200, 900

def main():
    print("Python Gravity Simulation")
    pygame.init()
    screen = pygame.display.set_mode(size, pygame.RESIZABLE)
    zoom = 1.0
    cameraPos = np.array([0, 0])
    bodies = Universe.genBodies(25, size)
    universe = Universe.Universe(bodies, size)
    # yellow = Particle.Particle([600, 450], [0, 0], 1000, 10, [255, 255, 0])
    # red = Particle.Particle([650, 550], [0.01, 0], 1000, 10, [255, 0, 0])
    # blue = Particle.Particle([550, 350], [-0.01, 0], 1000, 10, [0, 0, 255])
    # green = Particle.Particle([550, 650], [-0.5, 0], 1000, 10, [29, 227, 11])
    # purple = Particle.Particle([350, 550], [0, 0.5], 1000, 10, [148, 11, 227])
    #universe = Universe.Universe([yellow, red, blue, green, purple], size)
    clock = pygame.time.Clock()
    clear = False
    while True:
        clear = False

        cameraPos = universe.getCenter() - (np.array(size)/2)
        for event in pygame.event.get():
            if event.type == pygame.QUIT: 
                sys.exit()
            # if event.type == pygame.MOUSEWHEEL:
            #     if event.y==-1: zoom *= 1.25
            #     else: zoom /=1.25
            if event.type == pygame.MOUSEMOTION:
                if event.buttons[0] == 1:
                    cameraPos[0] += event.rel[0] / zoom * -1
                    cameraPos[1] += event.rel[1] / zoom * -1
            if pygame.key.get_pressed()[pygame.K_c]:
                clear = True
            if pygame.key.get_pressed()[pygame.K_x]:
                cameraPos = universe.getCenter() - (np.array(size)/2)
        universe.timeStep(clock.tick(60))
        screen.fill([0, 0, 0])
        universe.draw(screen, clear, np.array(cameraPos))
        pygame.display.flip()


if __name__ == "__main__":
    main()