# Ejercicio 3 — Herencia Simple

## Enunciado

Implementar herencia simple para extender las funcionalidades de una clase base: `Vehiculo`
define `arrancar()` y `detener()`, y `Coche` hereda de `Vehiculo` añadiendo `conducir()`.

## Diseño

- `Vehiculo` (`vehiculo.py`): clase base con `arrancar()` y `detener()`.
- `Coche` (`vehiculo.py`): hereda de `Vehiculo` (`class Coche(Vehiculo)`) y añade
  `conducir()`. Reutiliza `arrancar()` y `detener()` sin reimplementarlos.

`main.py` crea una instancia de `Coche` y usa los tres métodos (los dos heredados y el
propio).

## Cómo ejecutar

```bash
pip install -r requirements-dev.txt

# Ejecutar el demo de consola
python main.py

# Ejecutar las pruebas
pytest
```
