#include <SFML/Graphics.hpp>
#include "particle.cpp"
#include <iostream>

int main()
{
    sf::RenderWindow window(sf::VideoMode(800, 600), "Devoided");
    window.setFramerateLimit(60);
    Particle sun(400, 300, 500, 10, 0, 0, sf::Color::Yellow);
    Particle blue(300, 300, 0, 5, 0, 1, sf::Color::Blue);
    Particle red(500, 400, 0, 5, 1, 0, sf::Color::Red);
    std::vector<Particle> bodies = {blue, red, sun};
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
        }

        window.clear();
        red.doPhysicsStuff(bodies);
        sun.doPhysicsStuff(bodies);
        blue.doPhysicsStuff(bodies);
        sun.render(window);
        //std::cout << sun.getPos().x << " " << sun.getPos().y << std::endl;  
        red.render(window);
        blue.render(window);
        window.display();
    }

    return 0;
}