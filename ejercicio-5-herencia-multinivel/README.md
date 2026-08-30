# Ejercicio 5 — Herencia Multinivel y Sobrescritura de Métodos

## Enunciado

Demostrar herencia multinivel: `Animal` es la clase base, `Mamifero` una clase intermedia que
hereda de `Animal`, y `Perro` una clase derivada de `Mamifero` que sobrescribe
`hacer_sonido()`.

## Diseño

- `Animal` (`animal.py`): clase base con `hacer_sonido()`.
- `Mamifero` (`animal.py`): hereda de `Animal` (`class Mamifero(Animal)`) y añade
  `alimentar()`.
- `Perro` (`animal.py`): hereda de `Mamifero` (`class Perro(Mamifero)`), con lo que también
  es un `Animal`, y sobrescribe `hacer_sonido()`.

`main.py` crea un `Perro` y llama a `hacer_sonido()` (sobrescrito), `alimentar()` (heredado de
`Mamifero`) y de nuevo `hacer_sonido()` a través de una variable anotada como `Animal`,
mostrando que el despacho sigue siendo polimórfico a través de toda la cadena de herencia.

## Cómo ejecutar

```bash
pip install -r requirements-dev.txt

# Ejecutar el demo de consola
python main.py

# Ejecutar las pruebas
pytest
```
