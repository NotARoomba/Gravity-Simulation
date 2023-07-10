#include <math.h>
#include <iostream>
#include <vector>

static double G = 6.67e-11;
void test() {
    std::cout << "TEST C++" << std::endl;
}
struct vec2 {
    double x;
    double y;
    vec2(double x = 0, double y = 0) {
        this->x=x;
        this->y=y;
    }
};
vec2 operator+=(vec2 const& v1, vec2 const& v2) {
    return vec2(v1.x+v2.x, v1.y+v2.y);
};
vec2 operator*=(vec2 const& v1, double const& v2) {
    return vec2(v1.x*v2, v1.y*v2);
};
vec2 operator*(vec2 const& v1, double const& v2) {
    return vec2(v1.x*v2, v1.y*v2);
};
vec2 operator/(vec2 const& v1, int const& v2) {
    return vec2(v1.x/v2, v1.y/v2);
};

class Planet {
public:
    vec2 pos;
    vec2 vel;
    int radius;
    int mass;
    char* color;
    Planet(vec2 position, vec2 velocity, int radius, int mass, char* color) {
        this->pos=position;
        this->vel=velocity;
        this->radius=radius;
        this->mass=mass;
        this->color = color;
    };
    vec2 forceFrom(Planet* other) {
        double delta = std::sqrt(std::pow(other->pos.x - this->pos.x, 2) + std::pow(other->pos.y - this->pos.y, 2));

        if (delta == 0) return vec2(0, 0);

        double dx = this->pos.x - other->pos.x;
        double dy = this->pos.y - other->pos.y;

        double f = (G * this->mass * other->mass) / (delta*delta);

        double angle = std::atan2(dy, dx);

        vec2 force = vec2(f * std::cos(angle), f * sin(angle));
        force *=-1;
        double l = std::sqrt((force.x * force.x) + (force.y * force.y));
        force = vec2(force.x/l, force.y/l);
        return force;
    }
    void move(vec2* force, double time) {
        vec2 acceleration = *force / this->mass / std::sqrt((force->x * force->x) + (force->y * force->y));
        this->vel += (acceleration*time);
        this->pos += (this->vel*time);
    }
};

class Universe {
    public:
    std::vector<Planet> planets;
    Universe();
    void timeStep(double dt) {
        std::vector<vec2> forces;
        for (int i = 0; i < this->planets.size(); i++) {
            for (int j = 0; j < this->planets.size(); j++) {
                forces[i] += this->planets[i].forceFrom(&this->planets[j]);
            }
        }
        for (int i = 0; i < this->planets.size(); i++) {
            this->planets[i].move(&forces[i], dt);
        }
    };
};