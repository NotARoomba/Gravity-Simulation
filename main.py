import Particle
import Universe
import sys, pygame
size = width, height = 1200, 900

def main():
    print("Python Gravity Simulation")
    pygame.init()
    screen = pygame.display.set_mode(size, pygame.RESIZABLE)
    zoom = 1.0
    pan_x, pan_y = 0, 0
    #bodies = Universe.genBodies(50, size)
    #universe = Universe.Universe(bodies, size)
    yellow = Particle.Particle([600, 450], [0, 0], 100000, 10, [255, 255, 0])
    red = Particle.Particle([650, 550], [1, 0], 100, 10, [255, 0, 0])
    blue = Particle.Particle([550, 350], [-1, 0], 100, 10, [0, 0, 255])
    green = Particle.Particle([550, 650], [-0.5, 0], 100, 10, [255, 0, 0])
    purple = Particle.Particle([350, 550], [0.5, 0], 100, 10, [0, 0, 255])
    universe = Universe.Universe([yellow, red, blue, green, purple], size)
    clock = pygame.time.Clock()
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: 
                sys.exit()
            if event.type == pygame.MOUSEWHEEL:
                if event.y==-1: zoom *= 1.25
                else: zoom /=1.25
            if event.type == pygame.MOUSEMOTION:
                if event.buttons[0] == 1:
                    pan_x += event.rel[0] / zoom * -1
                    pan_y += event.rel[1] / zoom * -1
        universe.timeStep(clock.tick(60))
        screen.fill([0, 0, 0])
        #zoomed = pygame.Surface((int(screen.get_width() * zoom), int(screen.get_height() * zoom)))
        universe.draw(screen)
        #zoomed = pygame.transform.smoothscale(zoomed, screen.get_size())

        #screen.blit(zoomed, (-int(pan_x * zoom), -int(pan_y * zoom)))
        #pygame.display.update()
        pygame.display.flip()


if __name__ == "__main__":
    main()