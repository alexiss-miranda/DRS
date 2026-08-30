class Animal:
    """Clase base de la jerarquía Animal -> Mamifero -> Perro."""

    def hacer_sonido(self) -> str:
        return "El animal hace un sonido."


class Mamifero(Animal):
    """Clase intermedia: hereda de Animal y añade comportamiento propio
    de los mamíferos.
    """

    def alimentar(self) -> str:
        return "El mamífero alimenta a sus crías."


class Perro(Mamifero):
    """Extremo de la jerarquía: hereda de Mamifero (y transitivamente de
    Animal) y sobrescribe hacer_sonido().
    """

    def hacer_sonido(self) -> str:
        return "El perro ladra: ¡Guau!"
