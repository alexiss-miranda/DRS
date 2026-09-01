const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export const api = {
  health: () => request("/health"),

  obtenerSaldo: () => request("/cuenta-bancaria/saldo"),
  operarCuenta: (operacion, monto) =>
    request("/operar", { method: "POST", body: JSON.stringify({ operacion, monto }) }),
  reiniciarCuenta: () => request("/reiniciar", { method: "POST" }),

  crearEmpleado: (nombre, edad) =>
    request("/empleado", { method: "POST", body: JSON.stringify({ nombre, edad }) }),

  vehiculoAccion: (accion) =>
    request("/vehiculo/accion", { method: "POST", body: JSON.stringify({ accion }) }),

  animalSonido: (tipo) =>
    request("/animales/sonido", { method: "POST", body: JSON.stringify({ tipo }) }),

  multinivelAccion: (accion) =>
    request("/herencia-multinivel/accion", { method: "POST", body: JSON.stringify({ accion }) }),
};
