#include <SFML/Graphics/Color.hpp>
#include <SFML/Graphics/Drawable.hpp>
#include <SFML/Graphics/Rect.hpp>
#include <SFML/Graphics/RectangleShape.hpp>
#include <SFML/System/Vector2.hpp>
#include <algorithm>
#include <cmath>
#include <cstdint>
#include <iterator>
#include <math.h>
#include <vector>
#include "./Particle.cpp"

float distanceFrom(sf::Vector2f a, sf::Vector2f b) {
    return sqrtf(pow(a.x-b.x, 2) + pow(a.y-b.y, 2));
}

class QuadTreeNode {
    public:
    double mass;
    sf::Vector2f center_of_mass, dimensions, center;
    std::vector<QuadTreeNode> children;
    std::vector<Particle*> particles;
    QuadTreeNode(sf::Vector2f dimensions, sf::Vector2f center) {
        this->dimensions = dimensions;
        this ->center = center;
    };
    int getQuadrant(sf::Vector2f position) {
        if (position.x >= this->center.x && position.y >= this->center.y) return 0;
        else if (position.x <= this->center.x && position.y >= this->center.y) return 1;
        else if (position.x <= this->center.x && position.y <= this->center.y) return 2;
        else return 3;
    }
    void subdivide() {
        const sf::Vector2f nDimensions = {this->dimensions.x / 2, this->dimensions.y / 2};
        std::vector<sf::Vector2f> childCenters = {
            this->center + sf::Vector2f{nDimensions.x / 2, nDimensions.y / 2},
            this->center + sf::Vector2f{-nDimensions.x / 2, nDimensions.y / 2},
            this->center + sf::Vector2f{-nDimensions.x / 2, -nDimensions.y / 2},
            this->center + sf::Vector2f{nDimensions.x / 2, -nDimensions.y / 2},
        };
        for (sf::Vector2f c : childCenters) {
            this->children.push_back(QuadTreeNode(nDimensions, c));
        }
        for (Particle* particle : this->particles) {
            this->children[getQuadrant(particle->getPos())].addPlanet(particle);
        }
        this->particles.clear();
    }
    void addPlanet(Particle* particle) {
        if (this->children.size() == 0) {
            this->particles.push_back(particle);
            if (this->particles.size() > 1) {
                this->subdivide();
            }
        } else {
            this->children[getQuadrant(particle->getPos())].addPlanet(particle);
        }
    }
    void updateCOM() {
        if (this->particles.size() == 1) {
            this->mass = this->particles[0]->getMass();
            this->center_of_mass = this->particles[0]->getPos();
        } else {
            for (QuadTreeNode qtree : this->children) {
                qtree.updateCOM();
                this->mass += qtree.mass;
                this->center_of_mass += sf::Vector2f(qtree.center_of_mass.x * qtree.mass, qtree.center_of_mass.y * qtree.mass);
            }
        }
    }
    void rebuild(std::vector<Particle* > particles) {
        sf::Vector2f max = {INTMAX_MIN, INTMAX_MIN};
        sf::Vector2f min = {MAXFLOAT, MAXFLOAT};
        *this = QuadTreeNode(this->dimensions, this->center);
        for (Particle* particle : particles) {
            sf::Vector2f pos = particle->getPos();
            max = {std::max(max.x, pos.x), std::max(max.y, pos.y)};
            min = {std::min(min.x, pos.x), std::min(min.y, pos.y)};
            this->addPlanet(particle);
        }
        this->dimensions = max-min;
        this->center = min+sf::Vector2f(this->dimensions.x/2, this->dimensions.y/2);
        this->updateCOM();
    }
    void render(sf::RenderWindow& w, QuadTreeNode node)
    {  
        sf::RectangleShape rect = sf::RectangleShape(dimensions);
        rect.setPosition(node.center-sf::Vector2f(node.dimensions.x/2, node.dimensions.y/2));
        rect.setFillColor(sf::Color::Transparent);
        rect.setOutlineColor(sf::Color::White);
        rect.setOutlineThickness(1.0f);
        w.draw(rect);
        if (node.children.size() != 0) {
            for (QuadTreeNode child : node.children) {
                render(w, child);
            }
        }
    }
    std::vector<QuadTreeNode> findQuads(float theta, Particle* particle) {
        std::vector<QuadTreeNode*> queue;
        std::vector<QuadTreeNode> values;
        queue.push_back(this);

        while (queue.size() != 0) {
            //hacky stuff may be going on
            QuadTreeNode* node = queue.back();
            queue.pop_back();
            const float distance = distanceFrom(this->center_of_mass, particle->getPos());
            const float ratio = this->dimensions.x / distance;
            
            if (ratio < theta) {
                values.push_back(*node);
            } else {
                for (QuadTreeNode child : node->children) {
                    queue.push_back(&child);
                }
            }
        }
        return values;
    }

};