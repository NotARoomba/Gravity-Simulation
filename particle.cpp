#include <SFML/Graphics.hpp>
#include <math.h>
#include <algorithm>

class Particle {
	sf::Vector2f pos;
    float mass; 
    float radius; 
    float x, y; 
    float vX, vY; 
    float aX, aY;
    sf::Color color;
    sf::CircleShape s;


    public:
    	  Particle(float pos_x, float pos_y, float mass, float radius, float velX, float velY, sf::Color color) {
        pos.x = pos_x;
        pos.y = pos_y;
        this->mass = mass;
        this->vX = velX;
        this->vY = velY;
        this->radius = radius;
        this->color = color;
        s.setPosition(pos);
        s.setFillColor(color);
        s.setRadius(radius);
    }
    void render(sf::RenderWindow& w)
    {
    	s.setPosition(pos);
        w.draw(s);
    }

    sf::Vector2f getPos()
    {
        return pos;
    }
    sf::Vector2f getVel()
    {
        return sf::Vector2f(vX, vY);
    }
    sf::Vector2f getAccel()
    {
        return sf::Vector2f(aX, aY);
    }
    float getMass()
    {
        return mass;
    }
    float getRadius()
    {
        return radius;
    }
    void doPhysicsStuff(std::vector<Particle> particles) {
    	for (Particle p : particles) {
    		if (this != &p) {
	    		float dX = p.getPos().x - pos.x;
	    		float dY = p.getPos().y - pos.y;
	    		float d = sqrt(pow(dX, 2) + pow(dY, 2));
	    		float id = 1.0f / d;
	    		float isd = id * id;
	    		float nX = id * dX;
	    		float nY = id * dY;
	    		float acX = nX * p.getMass() * isd;
	    		float acY = nY * p.getMass() * isd;
	    		if ((p.getRadius() + this->getRadius()) < d) {
		    		this->vX += acX;
		    		this->vY += acY;
		    		this->pos.x += vX;
		    		this->pos.y += vY;
	    		} 
    		}
    	}
    }
    void doPhysicsStuff(Particle p) {
		if (p.getPos() != this->pos && p.getVel() != this->getVel()) {
			float dX = p.getPos().x - pos.x;
			float dY = p.getPos().y - pos.y;
			float d = sqrt(pow(dX, 2) + pow(dY, 2));
			float id = 1.0f / d;
			float isd = id * id;
			float nX = id * dX;
			float nY = id * dY;
			float acX = nX * p.getMass() * isd;
			float acY = nY * p.getMass() * isd;
			vX += acX;
			vY += acY;
			pos.x += vX;
			pos.y += vY;
		}
    }
};