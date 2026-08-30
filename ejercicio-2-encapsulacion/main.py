from empleado import Empleado


def main() -> None:
    empleado = Empleado("Ana Torres", 28)
    print(f"Nombre: {empleado.nombre}, Edad: {empleado.edad}")

    empleado.nombre = "Ana María Torres"
    empleado.edad = 29
    print(f"Nombre actualizado: {empleado.nombre}, Edad actualizada: {empleado.edad}")

    try:
        empleado.edad = 150
    except ValueError as error:
        print(f"Error: {error}")

    try:
        empleado.edad = 0
    except ValueError as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    main()
