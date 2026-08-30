class Vehiculo:
    """Clase base con el comportamiento común a todo vehículo."""

    def arrancar(self) -> str:
        return "El vehículo ha arrancado."

    def detener(self) -> str:
        return "El vehículo se ha detenido."


class Coche(Vehiculo):
    """Extiende Vehiculo con comportamiento propio de un coche,
    reutilizando arrancar() y detener() por herencia.
    """

    def conducir(self) -> str:
        return "El coche está siendo conducido."
