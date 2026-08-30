from vehiculo import Coche, Vehiculo


def test_coche_es_un_vehiculo():
    coche = Coche()

    assert isinstance(coche, Vehiculo)


def test_arrancar_devuelve_mensaje_esperado():
    coche = Coche()

    assert "arrancado" in coche.arrancar()


def test_conducir_devuelve_mensaje_esperado():
    coche = Coche()

    assert "conducido" in coche.conducir()


def test_detener_devuelve_mensaje_esperado():
    coche = Coche()

    assert "detenido" in coche.detener()
