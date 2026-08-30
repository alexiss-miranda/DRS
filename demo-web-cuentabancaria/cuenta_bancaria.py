from decimal import Decimal
from typing import Optional


class SaldoInsuficienteError(Exception):
    """Se lanza al intentar retirar un monto mayor al saldo disponible."""

    def __init__(self, saldo_actual: Decimal, monto_solicitado: Decimal):
        super().__init__(
            f"Fondos insuficientes: saldo actual {saldo_actual}, "
            f"monto solicitado {monto_solicitado}"
        )


class CuentaBancaria:
    """Cuenta bancaria con saldo oculto tras depositar/retirar/obtener_saldo.

    El atributo de saldo usa doble guion bajo (name mangling) porque en
    Python la convención de un solo guion bajo es solo una señal para
    quien lee el código, no una restricción real de acceso.
    """

    def __init__(self, saldo_inicial: Decimal = Decimal("0")):
        if saldo_inicial < 0:
            raise ValueError("El saldo inicial no puede ser negativo")
        self.__saldo = saldo_inicial

    def depositar(self, monto: Decimal) -> None:
        self.__validar_monto_positivo(monto)
        self.__saldo += monto

    def retirar(self, monto: Decimal) -> None:
        self.__validar_monto_positivo(monto)
        if monto > self.__saldo:
            raise SaldoInsuficienteError(self.__saldo, monto)
        self.__saldo -= monto

    def obtener_saldo(self) -> Decimal:
        return self.__saldo

    def __validar_monto_positivo(self, monto: Optional[Decimal]) -> None:
        if monto is None or monto <= 0:
            raise ValueError("El monto debe ser mayor que cero")
