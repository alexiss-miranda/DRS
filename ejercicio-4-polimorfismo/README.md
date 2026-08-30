# Ejercicio 4 — Polimorfismo

## Enunciado

Implementar polimorfismo mediante métodos sobrescritos: `Animal` define `hacer_sonido()`, y
`Perro` y `Gato` lo sobrescriben para producir un sonido distinto. Se usa una referencia de
tipo `Animal` para invocar el método y demostrar el despacho polimórfico.

## Diseño

- `Animal` (`animal.py`): clase base con `hacer_sonido()`.
- `Perro` y `Gato` (`animal.py`): heredan de `Animal` y sobrescriben `hacer_sonido()`.

En Python cualquier método de una subclase que reutilice el mismo nombre sobrescribe al de la
clase base automáticamente (no existe una palabra clave equivalente a `override`); el
despacho de `hacer_sonido()` siempre resuelve al tipo concreto del objeto en tiempo de
ejecución, sin importar el tipo declarado de la variable.

`main.py` guarda instancias de `Perro` y `Gato` en una lista tipada como `list[Animal]` y la
recorre llamando a `hacer_sonido()`: cada elemento ejecuta su propia implementación aunque la
lista esté anotada con el tipo base.

## Cómo ejecutar

```bash
pip install -r requirements-dev.txt

# Ejecutar el demo de consola
python main.py

# Ejecutar las pruebas
pytest
```
