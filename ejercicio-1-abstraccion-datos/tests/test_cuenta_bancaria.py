from decimal import Decimal

import pytest

from cuenta_bancaria import CuentaBancaria, SaldoInsuficienteError


def test_depositar_monto_valido_incrementa_el_saldo():
    cuenta = CuentaBancaria(Decimal("100.00"))

    cuenta.depositar(Decimal("50.00"))

    assert cuenta.obtener_saldo() == Decimal("150.00")


def test_depositar_monto_negativo_lanza_excepcion():
    cuenta = CuentaBancaria(Decimal("100.00"))

    with pytest.raises(ValueError):
        cuenta.depositar(Decimal("-10.00"))


def test_depositar_monto_cero_lanza_excepcion():
    cuenta = CuentaBancaria(Decimal("100.00"))

    with pytest.raises(ValueError):
        cuenta.depositar(Decimal("0"))


def test_retirar_monto_valido_decrementa_el_saldo():
    cuenta = CuentaBancaria(Decimal("100.00"))

    cuenta.retirar(Decimal("40.00"))

    assert cuenta.obtener_saldo() == Decimal("60.00")


def test_retirar_monto_negativo_o_cero_lanza_excepcion():
    cuenta = CuentaBancaria(Decimal("100.00"))

    with pytest.raises(ValueError):
        cuenta.retirar(Decimal("-5.00"))
    with pytest.raises(ValueError):
        cuenta.retirar(Decimal("0"))


def test_retirar_mas_que_el_saldo_lanza_excepcion_y_no_modifica_el_saldo():
    cuenta = CuentaBancaria(Decimal("100.00"))

    with pytest.raises(SaldoInsuficienteError):
        cuenta.retirar(Decimal("150.00"))
    assert cuenta.obtener_saldo() == Decimal("100.00")


def test_obtener_saldo_refleja_el_estado_tras_varias_operaciones():
    cuenta = CuentaBancaria()

    cuenta.depositar(Decimal("200.00"))
    cuenta.retirar(Decimal("50.00"))
    cuenta.depositar(Decimal("25.00"))

    assert cuenta.obtener_saldo() == Decimal("175.00")


def test_construir_con_saldo_inicial_negativo_lanza_excepcion():
    with pytest.raises(ValueError):
        CuentaBancaria(Decimal("-1.00"))
