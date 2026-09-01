import os
from decimal import Decimal, InvalidOperation

from flask import Flask, jsonify, request, session

import animal_multinivel as ej5
import animal_polimorfismo as ej4
from cuenta_bancaria import CuentaBancaria, SaldoInsuficienteError
from empleado import Empleado
from vehiculo import Coche

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "clave-de-desarrollo-no-usar-en-produccion")

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


@app.route("/api/herencia-multinivel/accion", methods=["POST"])
def api_multinivel_accion():
    data = request.get_json(silent=True) or {}
    perro = ej5.Perro()
    acciones = {"sonido": perro.hacer_sonido, "alimentar": perro.alimentar}
    metodo = acciones.get(data.get("accion"))
    if metodo is None:
        return jsonify(error="Acción no reconocida"), 400
    return jsonify(mensaje=metodo())
