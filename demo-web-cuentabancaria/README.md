# Demo web — Guía 1 (Python + Flask)

Extra opcional (no forma parte de la rúbrica de la guía): una reimplementación en Python de
las clases de los 5 ejercicios, cada una con su propia vista web interactiva, lista para
desplegarse en Vercel como un único sitio.

## Rutas

| Ruta | Ejercicio | Clases |
|---|---|---|
| `/` | — | Índice con enlaces a los 5 ejercicios |
| `/cuenta-bancaria` | 1 — Abstracción de datos | `CuentaBancaria` |
| `/empleado` | 2 — Encapsulación | `Empleado` |
| `/vehiculo` | 3 — Herencia simple | `Vehiculo`, `Coche` |
| `/animales` | 4 — Polimorfismo | `Animal`, `Perro`, `Gato` |
| `/herencia-multinivel` | 5 — Herencia multinivel | `Animal`, `Mamifero`, `Perro` |

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
- **HTML/CSS/JS inline en `app.py`**: para una interfaz tan pequeña, evita depender de la
  carpeta `public/` de Vercel o de la configuración de `static_folder` de Flask (que Vercel
  pide no usar para estáticos).

## Ejecutar en local

Requiere Python 3.12+.

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/macOS

pip install -r requirements-dev.txt
```

El código no llama a `app.run()` porque Vercel importa la variable `app` directamente en producción. Para levantar un servidor local, usa el [Vercel CLI](https://vercel.com/docs/cli) (recomendado, porque simula el entorno de Vercel):

```bash
npm i -g vercel
vercel dev
```

O, si prefieres el servidor de desarrollo normal de Flask sin instalar el CLI de Vercel:

```bash
set FLASK_APP=app.py            # Windows (cmd)
$env:FLASK_APP = "app.py"       # Windows (PowerShell)
flask run --debug
```

## Correr las pruebas

```bash
pip install -r requirements-dev.txt
pytest
```

## Desplegar en Vercel

1. Sube este repositorio a GitHub (ya lo tienes en `mr22058-guia1-drs`).
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. En **Root Directory**, selecciona `demo-web-cuentabancaria` (porque el repo tiene más carpetas además de esta).
4. Vercel detecta `requirements.txt` y el entrypoint `app.py` automáticamente — no se necesita configuración adicional. El deploy expone las 5 vistas listadas arriba a partir de la URL raíz.
5. (Opcional pero recomendado) En **Environment Variables**, agrega `SECRET_KEY` con un valor aleatorio propio, para no depender del valor de desarrollo incluido en el código.
6. Deploy.
