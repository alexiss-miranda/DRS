from animal_polimorfismo import Animal, Gato, Perro


def test_perro_referenciado_como_animal_ladra_al_hacer_sonido():
    animal: Animal = Perro()

    assert "ladra" in animal.hacer_sonido()


def test_gato_referenciado_como_animal_maulla_al_hacer_sonido():
    animal: Animal = Gato()

    assert "maúlla" in animal.hacer_sonido()


def test_animales_producen_sonidos_distintos():
    perro: Animal = Perro()
    gato: Animal = Gato()

    assert perro.hacer_sonido() != gato.hacer_sonido()
