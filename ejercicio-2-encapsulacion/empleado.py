class Empleado:
    """Encapsula los datos de un empleado.

    Nombre y edad se guardan en atributos privados (name mangling con
    doble guion bajo) y solo son accesibles a través de las propiedades
    `nombre` y `edad`, que validan cada valor asignado.
    """

    def __init__(self, nombre: str, edad: int):
        self.nombre = nombre
        self.edad = edad

    @property
    def nombre(self) -> str:
        return self.__nombre

    @nombre.setter
    def nombre(self, valor: str) -> None:
        if not valor or not valor.strip():
            raise ValueError("El nombre no puede estar vacío")
        self.__nombre = valor

    @property
    def edad(self) -> int:
        return self.__edad

    @edad.setter
    def edad(self, valor: int) -> None:
        if valor <= 0 or valor >= 100:
            raise ValueError("La edad debe ser mayor que 0 y menor que 100")
        self.__edad = valor
