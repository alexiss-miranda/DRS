import pytest

from empleado import Empleado


def test_constructor_con_datos_validos_establece_nombre_y_edad():
    empleado = Empleado("Carlos Ruiz", 35)

    assert empleado.nombre == "Carlos Ruiz"
    assert empleado.edad == 35


@pytest.mark.parametrize("nombre_invalido", ["", "   "])
def test_nombre_con_valor_vacio_lanza_excepcion(nombre_invalido):
    empleado = Empleado("Carlos Ruiz", 35)

    with pytest.raises(ValueError):
        empleado.nombre = nombre_invalido


@pytest.mark.parametrize("edad_valida", [1, 50, 99])
def test_edad_con_valor_valido_se_asigna_correctamente(edad_valida):
    empleado = Empleado("Carlos Ruiz", 35)

    empleado.edad = edad_valida

    assert empleado.edad == edad_valida


@pytest.mark.parametrize("edad_invalida", [0, -1, 100, 150])
def test_edad_con_valor_invalido_lanza_excepcion(edad_invalida):
    empleado = Empleado("Carlos Ruiz", 35)

    with pytest.raises(ValueError):
        empleado.edad = edad_invalida
