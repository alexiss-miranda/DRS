from decimal import Decimal

from cuenta_bancaria import CuentaBancaria, SaldoInsuficienteError


def main() -> None:
    cuenta = CuentaBancaria(Decimal("100.00"))
    print(f"Saldo inicial: {cuenta.obtener_saldo()}")

    cuenta.depositar(Decimal("50.00"))
    print(f"Saldo tras depositar 50: {cuenta.obtener_saldo()}")

    cuenta.retirar(Decimal("30.00"))
    print(f"Saldo tras retirar 30: {cuenta.obtener_saldo()}")

    try:
        cuenta.retirar(Decimal("1000.00"))
    except SaldoInsuficienteError as error:
        print(f"Error: {error}")

    try:
        cuenta.depositar(Decimal("-10.00"))
    except ValueError as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    main()
