#include <SFML/Graphics.hpp>
#include "particle.cpp"
#include <SFML/System/Vector2.hpp>
#include <iostream>
#include <stdlib.h> 
#include <time.h>
#define WIDTH 1980
#define HEIGHT 1024


void randomParticles(std::vector<Particle*> *b, int n, sf::Vector2i screen) {
    for (int i = 0; i < n; i++) {
        int mass = (int)rand()%1000+1;
        sf::Color color(rand() % 255, rand() % 255, rand() % 255);

        //Particle *particle = new Particle(800, 600, 10, 10, 0, 0, sf::Color::Red);
        Particle *particle = new Particle((int)rand()%screen.x, (int)rand()%screen.y, mass, (int)rand()%10, 0, 0, color, WIDTH, HEIGHT);
        b->push_back(particle);
    }
}
int main()
{
    srand(time(NULL));
    float zoom = 1.0f;
    bool moving;
    sf::Vector2f oldPos;
    sf::RenderWindow window(sf::VideoMode(WIDTH, HEIGHT), "Gravity Simulation");
   
    window.setFramerateLimit(60);
    // Particle sun(890, 512, 200, 10, 0, 0, sf::Color::Yellow, WIDTH, HEIGHT);
    // Particle blue(790, 512, 200, 10,0, -1 , sf::Color::Blue, WIDTH, HEIGHT);
    // Particle red(990, 600, 200, 10, 0.5, -1, sf::Color::Red, WIDTH, HEIGHT);
    // Particle redMoon(1000, 610, 1, 2, 0, -1, sf::Color::Green, WIDTH, HEIGHT);
    // std::vector<Particle*> bodies = {&blue, &red, &sun, &redMoon};
    //std::vector<Particle*> bodies = {&blue, &red, &sun};

    std::vector<Particle*> bodies;
    randomParticles(&bodies, 100, sf::Vector2i(WIDTH, HEIGHT));
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
            if (event.type == sf::Event::Resized) {
                sf::FloatRect visibleArea(0, 0, event.size.width, event.size.height);
                window.setView(sf::View(visibleArea));
            }
            if(event.type == sf::Event::MouseWheelScrolled) {
                if(event.mouseWheelScroll.wheel == sf::Mouse::VerticalWheel) {
                    sf::View view = window.getView();
                    if (event.mouseWheelScroll.delta <= -1)
                        zoom = std::min(2.f, zoom + .5f);
                    else if (event.mouseWheelScroll.delta >= 1)
                        zoom = std::max(.5f, zoom - .5f);
                    view.zoom(zoom);
                    window.setView(view);
                }
  
            }
            if (event.type == sf::Event::MouseButtonPressed) {
                // Mouse button is pressed, get the position and set moving as active
                    if (event.mouseButton.button == 0) {
                        moving = true;
                        oldPos = window.mapPixelToCoords(sf::Vector2i(event.mouseButton.x, event.mouseButton.y));
                    }
                }
                if (event.type == sf::Event::MouseButtonReleased) {
                    if (event.mouseButton.button == 0) {
                        moving = false;
                    }
                }
                if (event.type == sf::Event::MouseMoved)   {
                  
                        // Ignore mouse movement unless a button is pressed (see above)
                        if (!moving) break;
                        // Determine the new position in world coordinates
                        const sf::Vector2f newPos = window.mapPixelToCoords(sf::Vector2i(event.mouseMove.x, event.mouseMove.y));
                        // Determine how the cursor has moved
                        // Swap these to invert the movement direction
                        const sf::Vector2f deltaPos = oldPos - newPos;
                        sf::View view = window.getView();
                        // Move our view accordingly and update the window
                        view.setCenter(view.getCenter() + deltaPos);
                        window.setView(view);

                        // Save the new position as the old one
                        // We're recalculating this, since we've changed the view
                        oldPos = window.mapPixelToCoords(sf::Vector2i(event.mouseMove.x, event.mouseMove.y));
                    }

        }

        window.clear();
        //sun.render(window);
        //red.render(window);
        //blue.render(window);
        //red.doPhysicsStuff(bodies);
        //sun.doPhysicsStuff(bodies);
        //blue.doPhysicsStuff(bodies);
       // std::cout << "aa: " << (&bodies[1])->getPos().x << "\n";
       std::vector<sf::Vector2f> forces(bodies.size());
        for (int i = 0; i < bodies.size(); i++) {
            for (int j = 0; j < bodies.size(); j++) {
                forces[i] += bodies[i]->doPhysicsStuff(bodies[j]);
            }
        };
        for (int i = 0; i < bodies.size(); i++) {
            bodies[i]->move(forces[i]);
            bodies[i]->render(window);
        }
        window.display();
    }

    return 0;
}
