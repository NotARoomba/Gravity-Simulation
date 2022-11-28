all:
	g++ -c main.cpp particle.cpp
	g++ main.o -o physics -lsfml-graphics -lsfml-window -lsfml-system
	./physics