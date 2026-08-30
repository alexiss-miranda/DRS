from animal_multinivel import Animal, Mamifero, Perro


def test_perro_es_mamifero_y_animal():
    perro = Perro()

    assert isinstance(perro, Mamifero)
    assert isinstance(perro, Animal)


def test_hacer_sonido_esta_sobrescrito_en_perro():
    perro = Perro()

    assert "ladra" in perro.hacer_sonido()


def test_alimentar_se_hereda_de_mamifero():
    perro = Perro()

    assert "alimenta" in perro.alimentar()


def test_referencia_de_tipo_animal_sigue_usando_la_implementacion_de_perro():
    animal: Animal = Perro()

    assert "ladra" in animal.hacer_sonido()
