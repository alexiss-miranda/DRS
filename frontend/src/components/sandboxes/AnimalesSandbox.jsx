import { Cat, Dog, Volume2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/client";

const ANIMALES = [
  { tipo: "perro", label: "Perro", icon: Dog, color: "#8083FF" },
  { tipo: "gato", label: "Gato", icon: Cat, color: "#10B981" },
];

export default function AnimalesSandbox({ onLog }) {
  const [resultados, setResultados] = useState({});
  const [activo, setActivo] = useState(null);
  const [loading, setLoading] = useState(null);

  const invocar = async (tipo) => {
    setLoading(tipo);
    const { ok, status, data, ms } = await api.animalSonido(tipo);
    setLoading(null);

    onLog({
      method: "POST",
      endpoint: "/api/animales/sonido",
      payload: { tipo },
      level: "info",
      ok,
      status,
      ms,
      response: ok ? { sonido: data.sonido, clase: data.clase } : { error: data.error },
    });

    if (ok) {
      setResultados((prev) => ({ ...prev, [tipo]: data }));
      setActivo(tipo);
      setTimeout(() => setActivo(null), 500);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ANIMALES.map(({ tipo, label, icon: Icon, color }) => {
        const resultado = resultados[tipo];
        const sonando = activo === tipo;
        return (
          <div
            key={tipo}
            className={`rounded-xl border p-5 backdrop-blur-md transition-all ${
              sonando ? "border-[#8083FF]/50 shadow-[0_0_24px_rgba(128,131,255,0.25)]" : "border-white/10"
            } bg-[rgba(17,24,39,0.8)]`}
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: `${color}1a` }}
            >
              <Icon size={26} color={color} className={sonando ? "animate-pulse-dot" : ""} />
            </div>
            <h3 className="text-sm font-semibold text-white">{label}</h3>
            <p className="mt-1 min-h-[2.5rem] font-mono text-xs text-white/50">
              {resultado ? `"${resultado.sonido}"` : "animal.hacer_sonido()"}
            </p>

            <button
              onClick={() => invocar(tipo)}
              disabled={loading === tipo}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/30 py-2.5 text-xs font-medium text-white/80 transition-colors hover:border-white/20 hover:bg-white/5 disabled:opacity-50"
            >
              <Volume2 size={14} />
              Invocar sonido
            </button>
          </div>
        );
      })}

      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-4 backdrop-blur-md sm:col-span-2">
        <p className="text-xs text-white/40">
          <span className="font-mono text-[#8083FF]">Animal referencia</span> → misma llamada,
          resultado distinto según la instancia real. Eso es polimorfismo dinámico.
        </p>
      </div>
    </div>
  );
}
