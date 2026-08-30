from animal import Animal, Gato, Perro


def main() -> None:
    animales: list[Animal] = [Perro(), Gato()]

    for animal in animales:
        print(animal.hacer_sonido())


if __name__ == "__main__":
    main()
