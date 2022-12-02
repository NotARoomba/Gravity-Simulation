#include <SFML/Graphics.hpp>
#include <math.h>
#include <algorithm>
#include <iostream>
const double G = 6.67e-1;
class Particle {
	sf::Vector2f pos;
    float mass; 
    float radius; 
    float vX, vY;
    sf::Color color;
    sf::CircleShape s;


    public:
    	Particle(float pos_x, float pos_y, float mass, float radius, float velX, float velY, sf::Color color) {
        this->pos.x = pos_x;
        this->pos.y = pos_y;
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
    float getMass()
    {
        return mass;
    }
    float getRadius()
    {
        return radius;
    }
    void setVel(float x, float y) {
        vX = x;
        vY = y;
    }
    bool collision(Particle* p, Particle t, sf::Vector2f nPos) {
        float dX = p->getPos().x - (t.getPos().x + nPos.x + t.getVel().x);
        float dY = p->getPos().y - (t.getPos().y + nPos.y + t.getVel().y);
        float d = sqrt((dX * dX) + (dY * dY));
        return ((p->getRadius() + t.getRadius()) <= d);
    }
    void doPhysicsStuff(std::vector<Particle*> particles) {
    	for (Particle* p : particles) {
    		if (this != p) {
                float Fnet;
                float theta;
                float accel; 
	    		float dX = p->getPos().x - pos.x;
	    		float dY = p->getPos().y - pos.y;
	    		float d = sqrt((dX * dX) + (dY * dY));

                //Determine the net gravitational force between the two 
                Fnet = ((G * (getMass() * p->getMass())) / (d * d)); 
                //Determine the angle from a to b in 2-Dimensional space 
                theta = atan2(dY, dX); 
                //Determine the total acceleration 
                //std::cout << getMass() << " " << p->getMass() << "\n";
                accel = Fnet / getMass(); 
                //Find acceleration from vector components 
                float acX = accel * cos(theta); 
                float acY = accel * sin(theta);
	    		// float id = 1.0f / d;
	    		// float isd = id * id;
	    		// float nX = id * dX;
	    		// float nY = id * dY;
	    		// float acX = nX * p.getMass() * isd;
	    		// float acY = nY * p.getMass() * isd;float dX = p.getPos().x - pos.x;

                    
                if (collision(p, *this, sf::Vector2f(acX, acY))) {
	    		//if ((dX * dX) + (dY * dY) >= (p.getRadius() + getRadius()) ) {
                    vX += acX;
                    vY += acY;
                    //std::cout << pos.x << "\n";
                    pos.x += vX;
                    pos.y += vY;
	    		 } 
                 else {
                    vX-=acX;
                    vY-=acY;
                    p->setVel(vX, vY);
                    pos.x += vX;
                    pos.y += vY;
                }

                    vX = vY = 0; //TEST
                    acX = acY = 0;
    		}
    	}
    }
    void doPhysicsStuff(Particle p) {
		if (p.getPos() != pos && p.getVel() != getVel()) {
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