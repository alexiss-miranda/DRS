import os
from decimal import Decimal, InvalidOperation

from flask import Flask, jsonify, render_template_string, request, session

import animal_multinivel as ej5
import animal_polimorfismo as ej4
from cuenta_bancaria import CuentaBancaria, SaldoInsuficienteError
from empleado import Empleado
from vehiculo import Coche

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "clave-de-desarrollo-no-usar-en-produccion")

DOS_DECIMALES = Decimal("0.01")

EJERCICIOS = [
    {
        "slug": "cuenta-bancaria",
        "numero": 1,
        "titulo": "Abstracción de datos",
        "resumen": "CuentaBancaria: el saldo queda oculto y solo se accede a través de "
        "depositar, retirar y obtener_saldo.",
    },
    {
        "slug": "empleado",
        "numero": 2,
        "titulo": "Encapsulación",
        "resumen": "Empleado: nombre y edad son atributos privados, accesibles solo "
        "mediante propiedades que validan cada valor.",
    },
    {
        "slug": "vehiculo",
        "numero": 3,
        "titulo": "Herencia simple",
        "resumen": "Vehiculo / Coche: Coche hereda arrancar() y detener(), y añade su "
        "propio método conducir().",
    },
    {
        "slug": "animales",
        "numero": 4,
        "titulo": "Polimorfismo",
        "resumen": "Animal / Perro / Gato: una misma referencia Animal produce un "
        "sonido distinto según la subclase real.",
    },
    {
        "slug": "herencia-multinivel",
        "numero": 5,
        "titulo": "Herencia multinivel",
        "resumen": "Animal -> Mamifero -> Perro: Perro hereda de dos niveles y "
        "sobrescribe hacer_sonido().",
    },
]


def _formatear(monto: Decimal) -> str:
    return str(monto.quantize(DOS_DECIMALES))


def _cuenta_desde_sesion() -> CuentaBancaria:
    saldo = Decimal(session.get("saldo", "0.00"))
    return CuentaBancaria(saldo)


def _guardar_saldo(cuenta: CuentaBancaria) -> None:
    session["saldo"] = _formatear(cuenta.obtener_saldo())


def _nav_html(activo):
    enlaces = []
    for ejercicio in EJERCICIOS:
        clase = ' class="activo"' if ejercicio["slug"] == activo else ""
        enlaces.append(
            f'<a href="/{ejercicio["slug"]}"{clase}>Ej. {ejercicio["numero"]} · '
            f'{ejercicio["titulo"]}</a>'
        )
    return "\n".join(enlaces)


def render_page(title, activo, body_html):
    return render_template_string(
        PAGE_TEMPLATE,
        title=title,
        nav=_nav_html(activo),
        body=body_html,
    )


@app.route("/")
def index():
    tarjetas = "\n".join(
        f'<a class="tarjeta" href="/{ej["slug"]}">'
        f'<span class="numero">Ejercicio {ej["numero"]}</span>'
        f'<h2>{ej["titulo"]}</h2>'
        f'<p>{ej["resumen"]}</p>'
        f"</a>"
        for ej in EJERCICIOS
    )
    body = (
        "<h1>Guía 1 — Programación Orientada a Objetos</h1>"
        '<p class="subtitulo">Demo web de los 5 ejercicios: abstracción, '
        "encapsulación, herencia y polimorfismo. Cada tarjeta abre una vista "
        "interactiva sobre las mismas clases del repositorio.</p>"
        f'<div class="grid">{tarjetas}</div>'
    )
    return render_page("Guía 1 — POO", None, body)


# ---------------------------------------------------------------------------
# Ejercicio 1 — Abstracción de datos (CuentaBancaria)
# ---------------------------------------------------------------------------


@app.route("/cuenta-bancaria")
def cuenta_bancaria_view():
    saldo = session.get("saldo", "0.00")
    body = render_template_string(CUENTA_BANCARIA_BODY, saldo=saldo)
    return render_page("Ejercicio 1 — Abstracción de datos", "cuenta-bancaria", body)


@app.route("/api/operar", methods=["POST"])
def operar():
    data = request.get_json(silent=True) or {}
    operacion = data.get("operacion")

    try:
        monto = Decimal(str(data.get("monto", "")))
    except InvalidOperation:
        return jsonify(error="El monto debe ser un número válido"), 400

    cuenta = _cuenta_desde_sesion()

    try:
        if operacion == "depositar":
            cuenta.depositar(monto)
        elif operacion == "retirar":
            cuenta.retirar(monto)
        else:
            return jsonify(error="Operación no reconocida"), 400
    except (ValueError, SaldoInsuficienteError) as error:
        return jsonify(error=str(error)), 400

    _guardar_saldo(cuenta)
    return jsonify(saldo=_formatear(cuenta.obtener_saldo()))


@app.route("/api/reiniciar", methods=["POST"])
def reiniciar():
    session["saldo"] = "0.00"
    return jsonify(saldo="0.00")


# ---------------------------------------------------------------------------
# Ejercicio 2 — Encapsulación (Empleado)
# ---------------------------------------------------------------------------


@app.route("/empleado")
def empleado_view():
    return render_page("Ejercicio 2 — Encapsulación", "empleado", EMPLEADO_BODY)


@app.route("/api/empleado", methods=["POST"])
def api_empleado():
    data = request.get_json(silent=True) or {}
    nombre = data.get("nombre", "")

    try:
        edad = int(data.get("edad", ""))
    except (TypeError, ValueError):
        return jsonify(error="La edad debe ser un número entero"), 400

    try:
        empleado = Empleado(nombre, edad)
    except ValueError as error:
        return jsonify(error=str(error)), 400

    return jsonify(nombre=empleado.nombre, edad=empleado.edad)


# ---------------------------------------------------------------------------
# Ejercicio 3 — Herencia simple (Vehiculo / Coche)
# ---------------------------------------------------------------------------


@app.route("/vehiculo")
def vehiculo_view():
    return render_page("Ejercicio 3 — Herencia simple", "vehiculo", VEHICULO_BODY)


@app.route("/api/vehiculo/accion", methods=["POST"])
def api_vehiculo_accion():
    data = request.get_json(silent=True) or {}
    coche = Coche()
    acciones = {
        "arrancar": coche.arrancar,
        "conducir": coche.conducir,
        "detener": coche.detener,
    }
    metodo = acciones.get(data.get("accion"))
    if metodo is None:
        return jsonify(error="Acción no reconocida"), 400
    return jsonify(mensaje=metodo())


# ---------------------------------------------------------------------------
# Ejercicio 4 — Polimorfismo (Animal / Perro / Gato)
# ---------------------------------------------------------------------------


@app.route("/animales")
def animales_view():
    return render_page("Ejercicio 4 — Polimorfismo", "animales", ANIMALES_BODY)


@app.route("/api/animales/sonido", methods=["POST"])
def api_animales_sonido():
    data = request.get_json(silent=True) or {}
    clases = {"perro": ej4.Perro, "gato": ej4.Gato}
    clase = clases.get(data.get("tipo"))
    if clase is None:
        return jsonify(error="Tipo de animal no reconocido"), 400

    animal = clase()
    return jsonify(sonido=animal.hacer_sonido(), clase=type(animal).__name__)


# ---------------------------------------------------------------------------
# Ejercicio 5 — Herencia multinivel (Animal -> Mamifero -> Perro)
# ---------------------------------------------------------------------------


@app.route("/herencia-multinivel")
def herencia_multinivel_view():
    return render_page(
        "Ejercicio 5 — Herencia multinivel", "herencia-multinivel", MULTINIVEL_BODY
    )


@app.route("/api/herencia-multinivel/accion", methods=["POST"])
def api_multinivel_accion():
    data = request.get_json(silent=True) or {}
    perro = ej5.Perro()
    acciones = {"sonido": perro.hacer_sonido, "alimentar": perro.alimentar}
    metodo = acciones.get(data.get("accion"))
    if metodo is None:
        return jsonify(error="Acción no reconocida"), 400
    return jsonify(mensaje=metodo())


# ---------------------------------------------------------------------------
# Plantillas HTML
# ---------------------------------------------------------------------------

BASE_STYLE = """<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    margin: 0;
    color: #1a1a1a;
    background: #fafafa;
  }
  .topnav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.25rem;
    padding: 1rem 1.5rem;
    background: #fff;
    border-bottom: 1px solid #e2e2e2;
  }
  .topnav .marca a { font-weight: 700; color: #1a1a1a; text-decoration: none; }
  .topnav nav { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; }
  .topnav nav a { color: #555; text-decoration: none; font-size: 0.85rem; }
  .topnav nav a.activo { color: #2563eb; font-weight: 600; }
  .topnav nav a:hover { color: #2563eb; }
  main { max-width: 640px; margin: 0 auto; padding: 2rem 1.25rem 3rem; }
  h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
  .subtitulo { color: #666; margin-top: 0; margin-bottom: 1.5rem; }
  .jerarquia { font-size: 0.85rem; color: #666; margin-top: -0.75rem; margin-bottom: 1.25rem; }
  code { background: #f1f1f1; padding: 0.1rem 0.35rem; border-radius: 4px; font-size: 0.9em; }
  .card {
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  }
  .saldo { font-size: 2rem; font-weight: 600; margin: 0.25rem 0 1.25rem; }
  label { font-size: 0.85rem; color: #555; display: block; margin-bottom: 0.35rem; }
  input[type="number"], input[type="text"] {
    width: 100%;
    padding: 0.6rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .botones { display: flex; gap: 0.6rem; flex-wrap: wrap; }
  button {
    flex: 1;
    min-width: 130px;
    padding: 0.6rem 0.9rem;
    font-size: 0.95rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    background: #2563eb;
  }
  button.secundario {
    margin-top: 0.75rem;
    width: 100%;
    background: transparent;
    color: #555;
    border: 1px solid #ccc;
  }
  .mensaje { margin-top: 0.9rem; font-size: 0.9rem; min-height: 1.2em; }
  .mensaje.error { color: #dc2626; }
  .mensaje.ok { color: #16a34a; }
  #resultado { margin-top: 0.5rem; font-size: 0.95rem; font-weight: 600; }
  .log { margin: 1rem 0 0; padding-left: 1.1rem; font-size: 0.9rem; color: #333; }
  .log li { margin-bottom: 0.35rem; }
  .grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
  .tarjeta {
    display: block;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  }
  .tarjeta:hover { border-color: #2563eb; }
  .tarjeta .numero {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #2563eb;
    font-weight: 600;
  }
  .tarjeta h2 { margin: 0.25rem 0 0.35rem; font-size: 1.1rem; }
  .tarjeta p { margin: 0; color: #666; font-size: 0.9rem; }
</style>"""

PAGE_TEMPLATE = (
    """<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ title }}</title>
"""
    + BASE_STYLE
    + """
</head>
<body>
<header class="topnav">
  <div class="marca"><a href="/">Guía 1 — POO</a></div>
  <nav>{{ nav | safe }}</nav>
</header>
<main>
{{ body | safe }}
</main>
</body>
</html>"""
)

CUENTA_BANCARIA_BODY = """
<h1>Ejercicio 1 — Abstracción de datos</h1>
<p class="subtitulo"><code>CuentaBancaria</code> oculta el saldo y solo lo expone a
través de <code>depositar</code>, <code>retirar</code> y <code>obtener_saldo</code>.</p>
<div class="card">
  <label>Saldo actual</label>
  <div class="saldo" id="saldo">${{ saldo }}</div>

  <label for="monto">Monto</label>
  <input type="number" id="monto" step="0.01" min="0" placeholder="0.00">

  <div class="botones">
    <button id="depositar">Depositar</button>
    <button id="retirar" style="background:#dc2626">Retirar</button>
  </div>
  <button id="reiniciar" class="secundario">Reiniciar cuenta</button>

  <div class="mensaje" id="mensaje"></div>
</div>

<script>
const saldoEl = document.getElementById("saldo");
const montoEl = document.getElementById("monto");
const mensajeEl = document.getElementById("mensaje");

async function operar(operacion) {
  mensajeEl.textContent = "";
  mensajeEl.className = "mensaje";

  try {
    const res = await fetch("/api/operar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operacion, monto: montoEl.value })
    });
    const data = await res.json();
    if (!res.ok) {
      mensajeEl.textContent = data.error || "Ocurrió un error";
      mensajeEl.className = "mensaje error";
      return;
    }
    saldoEl.textContent = "$" + data.saldo;
    mensajeEl.textContent = operacion === "depositar" ? "Depósito realizado" : "Retiro realizado";
    mensajeEl.className = "mensaje ok";
    montoEl.value = "";
  } catch (err) {
    mensajeEl.textContent = "No se pudo conectar con el servidor";
    mensajeEl.className = "mensaje error";
  }
}

document.getElementById("depositar").addEventListener("click", () => operar("depositar"));
document.getElementById("retirar").addEventListener("click", () => operar("retirar"));
document.getElementById("reiniciar").addEventListener("click", async () => {
  const res = await fetch("/api/reiniciar", { method: "POST" });
  const data = await res.json();
  saldoEl.textContent = "$" + data.saldo;
  mensajeEl.textContent = "Cuenta reiniciada";
  mensajeEl.className = "mensaje ok";
});
</script>
"""

EMPLEADO_BODY = """
<h1>Ejercicio 2 — Encapsulación</h1>
<p class="subtitulo"><code>Empleado</code> guarda <code>nombre</code> y <code>edad</code>
en atributos privados; solo se modifican a través de propiedades que validan cada valor
(edad mayor que 0 y menor que 100).</p>
<div class="card">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" placeholder="Carlos Ruiz">

  <label for="edad">Edad</label>
  <input type="number" id="edad" placeholder="35">

  <div class="botones">
    <button id="crear">Crear empleado</button>
  </div>

  <div class="mensaje" id="mensaje"></div>
  <div id="resultado"></div>
</div>

<script>
const nombreEl = document.getElementById("nombre");
const edadEl = document.getElementById("edad");
const mensajeEl = document.getElementById("mensaje");
const resultadoEl = document.getElementById("resultado");

document.getElementById("crear").addEventListener("click", async () => {
  mensajeEl.textContent = "";
  mensajeEl.className = "mensaje";
  resultadoEl.textContent = "";

  try {
    const res = await fetch("/api/empleado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreEl.value, edad: edadEl.value })
    });
    const data = await res.json();
    if (!res.ok) {
      mensajeEl.textContent = data.error || "Ocurrió un error";
      mensajeEl.className = "mensaje error";
      return;
    }
    mensajeEl.textContent = "Empleado creado correctamente";
    mensajeEl.className = "mensaje ok";
    resultadoEl.textContent = data.nombre + " — " + data.edad + " años";
  } catch (err) {
    mensajeEl.textContent = "No se pudo conectar con el servidor";
    mensajeEl.className = "mensaje error";
  }
});
</script>
"""

VEHICULO_BODY = """
<h1>Ejercicio 3 — Herencia simple</h1>
<p class="subtitulo"><code>Coche</code> hereda <code>arrancar()</code> y
<code>detener()</code> de <code>Vehiculo</code>, y añade su propio método
<code>conducir()</code>.</p>
<div class="card">
  <div class="botones">
    <button id="arrancar">Arrancar</button>
    <button id="conducir" style="background:#7c3aed">Conducir</button>
    <button id="detener" style="background:#dc2626">Detener</button>
  </div>
  <ul class="log" id="log"></ul>
</div>

<script>
const logEl = document.getElementById("log");

async function accion(nombre) {
  const li = document.createElement("li");
  try {
    const res = await fetch("/api/vehiculo/accion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: nombre })
    });
    const data = await res.json();
    li.textContent = res.ok ? data.mensaje : (data.error || "Ocurrió un error");
  } catch (err) {
    li.textContent = "No se pudo conectar con el servidor";
  }
  logEl.prepend(li);
}

document.getElementById("arrancar").addEventListener("click", () => accion("arrancar"));
document.getElementById("conducir").addEventListener("click", () => accion("conducir"));
document.getElementById("detener").addEventListener("click", () => accion("detener"));
</script>
"""

ANIMALES_BODY = """
<h1>Ejercicio 4 — Polimorfismo</h1>
<p class="subtitulo">Una misma referencia de tipo <code>Animal</code> invoca
<code>hacer_sonido()</code>; el sonido real depende de si el objeto detrás es
<code>Perro</code> o <code>Gato</code>.</p>
<div class="card">
  <div class="botones">
    <button id="perro">Perro</button>
    <button id="gato" style="background:#7c3aed">Gato</button>
  </div>
  <div class="mensaje" id="mensaje"></div>
</div>

<script>
const mensajeEl = document.getElementById("mensaje");

async function sonido(tipo) {
  mensajeEl.className = "mensaje";
  try {
    const res = await fetch("/api/animales/sonido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo })
    });
    const data = await res.json();
    if (!res.ok) {
      mensajeEl.textContent = data.error || "Ocurrió un error";
      mensajeEl.className = "mensaje error";
      return;
    }
    mensajeEl.textContent = 'animal.hacer_sonido() -> "' + data.sonido +
      '"  (instancia real: ' + data.clase + ")";
    mensajeEl.className = "mensaje ok";
  } catch (err) {
    mensajeEl.textContent = "No se pudo conectar con el servidor";
    mensajeEl.className = "mensaje error";
  }
}

document.getElementById("perro").addEventListener("click", () => sonido("perro"));
document.getElementById("gato").addEventListener("click", () => sonido("gato"));
</script>
"""

MULTINIVEL_BODY = """
<h1>Ejercicio 5 — Herencia multinivel</h1>
<p class="subtitulo"><code>Perro</code> hereda de <code>Mamifero</code>, que a su vez
hereda de <code>Animal</code>. Sobrescribe <code>hacer_sonido()</code> y hereda
<code>alimentar()</code> sin redefinirlo.</p>
<p class="jerarquia"><code>Animal</code> &rarr; <code>Mamifero</code> &rarr; <code>Perro</code></p>
<div class="card">
  <div class="botones">
    <button id="sonido">Perro.hacer_sonido()</button>
    <button id="alimentar" style="background:#16a34a">Perro.alimentar()</button>
  </div>
  <ul class="log" id="log"></ul>
</div>

<script>
const logEl = document.getElementById("log");

async function accion(nombre) {
  const li = document.createElement("li");
  try {
    const res = await fetch("/api/herencia-multinivel/accion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: nombre })
    });
    const data = await res.json();
    li.textContent = res.ok ? data.mensaje : (data.error || "Ocurrió un error");
  } catch (err) {
    li.textContent = "No se pudo conectar con el servidor";
  }
  logEl.prepend(li);
}

document.getElementById("sonido").addEventListener("click", () => accion("sonido"));
document.getElementById("alimentar").addEventListener("click", () => accion("alimentar"));
</script>
"""
