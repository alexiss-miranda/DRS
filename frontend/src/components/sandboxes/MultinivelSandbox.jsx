import { Dog, Drumstick, Volume2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/client";

const ACCIONES = [
  { key: "sonido", label: "Perro.hacer_sonido()", icon: Volume2, color: "#8083FF" },
  { key: "alimentar", label: "Perro.alimentar()", icon: Drumstick, color: "#10B981" },
];

export default function MultinivelSandbox({ onLog }) {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(null);

  const ejecutar = async (accion) => {
    setLoading(accion);
    const { ok, status, data, ms } = await api.multinivelAccion(accion);
    setLoading(null);

    onLog({
      method: "POST",
      endpoint: "/api/herencia-multinivel/accion",
      payload: { accion },
      level: "info",
      ok,
      status,
      ms,
      response: ok ? { mensaje: data.mensaje } : { error: data.error },
    });

    if (ok) {
      setHistorial((prev) => [{ id: Date.now(), accion, texto: data.mensaje }, ...prev].slice(0, 6));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-white/40">
          <span>Animal</span>
          <span className="text-white/20">→</span>
          <span>Mamifero</span>
          <span className="text-white/20">→</span>
          <span className="text-[#8083FF]">Perro</span>
        </div>

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#8083FF]/10">
          <Dog size={26} className="text-[#8083FF]" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ACCIONES.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => ejecutar(key)}
              disabled={loading === key}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/30 py-3 font-mono text-xs text-white/80 transition-colors hover:border-white/20 hover:bg-white/5 disabled:opacity-50"
            >
              <Icon size={15} color={color} />
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
