import base64
import os
from decimal import Decimal, InvalidOperation
from pathlib import Path

from flask import Flask, jsonify, render_template, request, send_file, session

import animal_multinivel as ej5
import animal_polimorfismo as ej4
from cuenta_bancaria import CuentaBancaria, SaldoInsuficienteError
from empleado import Empleado
from vehiculo import Coche

BASE_DIR = Path(__file__).resolve().parent

app = Flask(
    __name__,
    template_folder=str(BASE_DIR / "templates"),
    static_folder=str(BASE_DIR / "static"),
    static_url_path="/static"
)
app.secret_key = os.environ.get("SECRET_KEY", "clave-de-desarrollo-no-usar-en-produccion")

# Cargar imágenes en Base64 para garantizar 100% de disponibilidad en Vercel Serverless
def _cargar_data_uri(nombre_archivo: str) -> str:
    for ruta in [
        BASE_DIR / "static" / "img" / nombre_archivo,
        BASE_DIR.parent / "static" / "img" / nombre_archivo,
        Path("/var/task/demo-web-cuentabancaria/static/img") / nombre_archivo,
        Path("/var/task/static/img") / nombre_archivo,
    ]:
        if ruta.exists():
            try:
                with open(ruta, "rb") as f:
                    return f"data:image/jpeg;base64,{base64.b64encode(f.read()).decode('utf-8')}"
            except Exception:
                pass
    return f"/static/img/{nombre_archivo}"

PERRO_DATA_URI = _cargar_data_uri("perro_cybernetico.jpg")
GATO_DATA_URI = _cargar_data_uri("gato_cybernetico.jpg")

DOS_DECIMALES = Decimal("0.01")


def _formatear(monto: Decimal) -> str:
    return str(monto.quantize(DOS_DECIMALES))


def _cuenta_desde_sesion() -> CuentaBancaria:
    saldo = Decimal(session.get("saldo", "0.00"))
    return CuentaBancaria(saldo)


def _guardar_saldo(cuenta: CuentaBancaria) -> None:
    session["saldo"] = _formatear(cuenta.obtener_saldo())


# ---------------------------------------------------------------------------
# Estado del API
# ---------------------------------------------------------------------------


@app.route("/api/health")
def api_health():
    return jsonify(status="ok")


# ---------------------------------------------------------------------------
# Ejercicio 1 — Abstracción de datos (CuentaBancaria)
# ---------------------------------------------------------------------------


@app.route("/")
@app.route("/cuenta-bancaria")
def cuenta_bancaria_view():
    return render_template("cuenta_bancaria.html")


@app.route("/api/cuenta-bancaria/saldo")
def api_cuenta_bancaria_saldo():
    cuenta = _cuenta_desde_sesion()
    return jsonify(saldo=_formatear(cuenta.obtener_saldo()))


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
    return render_template("empleado.html")


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
    return render_template("vehiculo.html")


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


@app.route("/static/img/<path:filename>")
def serve_image(filename):
    for folder in [
        BASE_DIR / "static" / "img",
        BASE_DIR.parent / "static" / "img",
        Path("/var/task/demo-web-cuentabancaria/static/img"),
        Path("/var/task/static/img"),
    ]:
        file_path = folder / filename
        if file_path.exists():
            return send_file(str(file_path), mimetype="image/jpeg")
    return ("Image not found", 404)


# ---------------------------------------------------------------------------
# Ejercicio 4 — Polimorfismo (Animal / Perro / Gato)
# ---------------------------------------------------------------------------


@app.route("/animales")
def animales_view():
    return render_template(
        "animales.html",
        perro_img=PERRO_DATA_URI,
        gato_img=GATO_DATA_URI
    )


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
def multinivel_view():
    return render_template(
        "herencia_multinivel.html",
        perro_img=PERRO_DATA_URI
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


if __name__ == "__main__":
    app.run(debug=True, port=5000)

