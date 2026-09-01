import { CircleStop, Gauge, Power } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/client";

const ACCIONES = [
  { key: "arrancar", label: "Arrancar", icon: Power, color: "#10B981" },
  { key: "conducir", label: "Conducir", icon: Gauge, color: "#8083FF" },
  { key: "detener", label: "Detener", icon: CircleStop, color: "#ef4444" },
];

export default function VehiculoSandbox({ onLog }) {
  const [estado, setEstado] = useState("apagado");
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(null);

  const ejecutar = async (accion) => {
    setLoading(accion);
    const { ok, status, data } = await api.vehiculoAccion(accion);
    setLoading(null);

    onLog({
      method: "POST",
      endpoint: "/api/vehiculo/accion",
      call: `Coche.${accion}()`,
      status,
      ok,
      result: ok ? data.mensaje : data.error,
    });

    if (ok) {
      if (accion === "arrancar") setEstado("encendido");
      if (accion === "detener") setEstado("apagado");
      if (accion === "conducir") setEstado("en marcha");
      setHistorial((prev) => [{ id: Date.now(), texto: data.mensaje }, ...prev].slice(0, 6));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-white/40">Estado del motor</span>
          <span
            className={`rounded-full border px-3 py-1 font-mono text-xs ${
              estado === "encendido" || estado === "en marcha"
                ? "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]"
                : "border-white/10 bg-white/5 text-white/50"
            }`}
          >
            {estado}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {ACCIONES.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => ejecutar(key)}
              disabled={loading === key}
              className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-black/30 py-4 text-xs font-medium text-white/80 transition-colors hover:border-white/20 hover:bg-white/5 disabled:opacity-50"
            >
              <Icon size={20} color={color} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <p className="mb-3 text-xs uppercase tracking-wide text-white/40">Registro de acciones</p>
        {historial.length === 0 ? (
          <p className="text-sm text-white/30">Sin acciones todavía.</p>
        ) : (
          <ul className="space-y-2">
            {historial.map((h) => (
              <li key={h.id} className="font-mono text-xs text-white/60">
                {h.texto}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
