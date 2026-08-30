from vehiculo import Coche


def main() -> None:
    coche = Coche()
    print(coche.arrancar())
    print(coche.conducir())
    print(coche.detener())


if __name__ == "__main__":
    main()
