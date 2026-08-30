from animal import Animal, Perro


def main() -> None:
    perro = Perro()
    print(perro.hacer_sonido())  # Sobrescrito en Perro
    print(perro.alimentar())  # Heredado de Mamifero

    animal_perro: Animal = perro
    print(animal_perro.hacer_sonido())  # Sigue usando la implementación de Perro


if __name__ == "__main__":
    main()
