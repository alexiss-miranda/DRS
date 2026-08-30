# Ejercicio 2 — Encapsulación y Control de Acceso

## Enunciado

Aplicar encapsulación para proteger los datos de un `Empleado` y controlar el acceso a sus
atributos `nombre` y `edad`, validando que la edad esté siempre en un rango válido.

## Diseño

`Empleado` (`empleado.py`) guarda `nombre` y `edad` en atributos privados (`self.__nombre`,
`self.__edad`) mediante *name mangling*. El acceso externo se hace exclusivamente a través de
las propiedades `nombre` y `edad`, implementadas con `@property` / `@<propiedad>.setter`:

- `nombre`: rechaza valores vacíos o en blanco (`ValueError`).
- `edad`: rechaza valores fuera del rango `(0, 100)` (`ValueError`).

El constructor asigna `self.nombre = nombre` y `self.edad = edad` (no a los atributos
privados directamente), por lo que reutiliza los setters y las mismas validaciones aplican
tanto al crear el objeto como al modificarlo después.

## Cómo ejecutar

```bash
pip install -r requirements-dev.txt

# Ejecutar el demo de consola
python main.py

# Ejecutar las pruebas
pytest
```
