class Animal:
    """Clase base cuyo método hacer_sonido() es sobrescrito por las
    subclases para demostrar polimorfismo.
    """

    def hacer_sonido(self) -> str:
        return "El animal hace un sonido."


class Perro(Animal):
    def hacer_sonido(self) -> str:
        return "El perro ladra: ¡Guau!"


class Gato(Animal):
    def hacer_sonido(self) -> str:
        return "El gato maúlla: ¡Miau!"
