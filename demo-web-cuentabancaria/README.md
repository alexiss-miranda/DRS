# Demo web — Guía 1 (Python + Flask)

Extra opcional (no forma parte de la rúbrica de la guía): una reimplementación en Python de
las clases de los 5 ejercicios, expuestas como API JSON. La interfaz (**DRS POO Studio**) vive
aparte, en [`../frontend/`](../frontend), como una SPA de React que consume estos endpoints.

## Endpoints

| Endpoint | Ejercicio | Clases |
|---|---|---|
| `GET /api/health` | — | Estado del servidor |
| `GET /api/cuenta-bancaria/saldo` | 1 — Abstracción de datos | `CuentaBancaria` |
| `POST /api/operar` | 1 — Abstracción de datos | `CuentaBancaria` |
| `POST /api/reiniciar` | 1 — Abstracción de datos | `CuentaBancaria` |
| `POST /api/empleado` | 2 — Encapsulación | `Empleado` |
| `POST /api/vehiculo/accion` | 3 — Herencia simple | `Vehiculo`, `Coche` |
| `POST /api/animales/sonido` | 4 — Polimorfismo | `Animal`, `Perro`, `Gato` |
| `POST /api/herencia-multinivel/accion` | 5 — Herencia multinivel | `Animal`, `Mamifero`, `Perro` |

## Por qué esta estructura

- **Un módulo por ejercicio** (`cuenta_bancaria.py`, `empleado.py`, `vehiculo.py`,
  `animal_polimorfismo.py`, `animal_multinivel.py`): son copias en Python de las mismas
  clases de cada carpeta `ejercicio-N-*/` del repo. Se duplican (en vez de importarse desde
  `../ejercicio-N-*/`) porque Vercel solo construye la carpeta que se elija como **Root
  Directory** al importar el proyecto; no puede alcanzar carpetas hermanas fuera de ella.
  `animal_polimorfismo.py` y `animal_multinivel.py` usan nombres de archivo distintos
  porque ambos definen una clase `Animal` distinta (ejercicios 4 y 5).
- **`app.py`**: la interfaz web. Es el *entrypoint* que Vercel detecta automáticamente para
  el runtime de Python (busca un archivo `app.py`, `index.py`, `server.py`, `main.py`,
  `wsgi.py` o `asgi.py` en la raíz con una variable `app` de Flask). No hace falta ningún
  `vercel.json` para que funcione: Vercel enruta todas las peticiones a esta app tal cual
  corre localmente.
- **Sin base de datos**: el saldo de `CuentaBancaria` se guarda en la cookie de sesión de
  Flask (firmada con `SECRET_KEY`), no en memoria del servidor. Esto es importante porque
  las funciones serverless de Vercel no garantizan mantener estado en memoria entre
  peticiones — cada request puede atender una instancia distinta. El cliente nunca lee ni
  escribe el saldo directamente: solo pide operaciones (`depositar`/`retirar`) y el servidor
  aplica las reglas de `CuentaBancaria` y devuelve el nuevo saldo. Esto es, otra vez,
  abstracción de datos: el saldo real vive encapsulado en el objeto `CuentaBancaria` del
  lado del servidor. Las demás vistas (Empleado, Vehiculo/Coche, Animal/Perro/Gato,
  jerarquía multinivel) no necesitan estado entre peticiones: cada clic crea la instancia
  correspondiente, ejecuta el método pedido y devuelve el resultado.
- **`app.py` sin vistas HTML**: expone solo endpoints JSON. La interfaz vive en
  [`../frontend/`](../frontend) (React + Vite + Tailwind) y habla con este backend por
  `fetch`; en local, el dev server de Vite hace de proxy de `/api` hacia Flask (ver
  `frontend/vite.config.js`), y en producción ambos se sirven desde el mismo dominio de
  Vercel (ver `vercel.json` en la raíz del repo).

## Ejecutar en local

Requiere Python 3.12+. Este backend solo sirve la API — para ver la interfaz hay que correrlo
junto al frontend (ver [`../frontend/README.md`](../frontend/README.md)).

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/macOS

pip install -r requirements-dev.txt

set FLASK_APP=app.py            # Windows (cmd)
$env:FLASK_APP = "app.py"       # Windows (PowerShell)
# export FLASK_APP=app.py       # Linux/macOS

flask run --debug   # levanta la API en http://127.0.0.1:5000
```

En otra terminal, dentro de `frontend/`, corre `npm run dev` — su servidor de Vite hace
proxy de `/api` hacia `http://127.0.0.1:5000` (configurado en `frontend/vite.config.js`).

## Correr las pruebas

```bash
pip install -r requirements-dev.txt
pytest
```

## Desplegar en Vercel

El despliegue es un único proyecto de Vercel para todo el repo (no se elige un Root
Directory), configurado por el `vercel.json` de la raíz:

- `api/handler.py` (build `@vercel/python`) importa `app` desde este `app.py` y sirve todas
  las rutas `/api/*`.
- `frontend/` (build `@vercel/static-build`) compila la SPA de React y sirve el resto de
  rutas.

Pasos:

1. Sube el repositorio a GitHub (ya lo tienes en `mr22058-guia1-drs`).
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio con el **Root
   Directory** por defecto (la raíz del repo, no esta carpeta).
3. (Opcional pero recomendado) En **Environment Variables**, agrega `SECRET_KEY` con un
   valor aleatorio propio, para no depender del valor de desarrollo incluido en el código.
4. Deploy.
