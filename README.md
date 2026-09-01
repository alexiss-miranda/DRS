# Guía 1 — Diseño y Repositorios de Software (DRS)

Repositorio con la resolución de los ejercicios de la Guía 1 (POO en Python: abstracción,
encapsulación, herencia y polimorfismo). Cada ejercicio vive en su propia carpeta, con su
propio código, pruebas y documentación.

## Ejercicios

| Ejercicio | Tema | Carpeta |
|---|---|---|
| 1 | Abstracción de datos (`CuentaBancaria`) | [`ejercicio-1-abstraccion-datos/`](./ejercicio-1-abstraccion-datos) |
| 2 | Encapsulación y control de acceso (`Empleado`) | [`ejercicio-2-encapsulacion/`](./ejercicio-2-encapsulacion) |
| 3 | Herencia simple (`Vehiculo` / `Coche`) | [`ejercicio-3-herencia-simple/`](./ejercicio-3-herencia-simple) |
| 4 | Polimorfismo (`Animal` / `Perro` / `Gato`) | [`ejercicio-4-polimorfismo/`](./ejercicio-4-polimorfismo) |
| 5 | Herencia multinivel (`Animal` / `Mamifero` / `Perro`) | [`ejercicio-5-herencia-multinivel/`](./ejercicio-5-herencia-multinivel) |

## Requisitos generales

- Python 3.10 o superior

Cada carpeta de ejercicio es independiente: un módulo con la implementación, un `main.py` con
el demo de consola y una carpeta `tests/` con pruebas `pytest`. Para instalar dependencias y
correr un ejercicio, entrar a su carpeta y ejecutar:

```bash
pip install -r requirements-dev.txt

python main.py   # corre el demo de consola
pytest            # corre las pruebas
```

Instrucciones específicas de cada ejercicio (enunciado, decisiones de diseño) están en el
`README.md` de su carpeta.

## Extras

| Extra | Tema | Carpeta |
|---|---|---|
| Demo web — backend | API JSON (Flask) que reimplementa los 5 ejercicios | [`demo-web-cuentabancaria/`](./demo-web-cuentabancaria) |
| Demo web — frontend | **DRS POO Studio**: SPA (React + Vite + Tailwind) que consume esa API | [`frontend/`](./frontend) |

Ambos se despliegan juntos en Vercel como un único proyecto (ver `vercel.json`).
# DRS-Guia1
