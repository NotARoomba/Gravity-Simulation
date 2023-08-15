all: clean
	g++ -c main.cpp Particle.cpp QuadTree.cpp
	g++ main.o -o physics -lsfml-graphics -lsfml-window -lsfml-system
	./physics

clean: 
	rm -rf ./*.o