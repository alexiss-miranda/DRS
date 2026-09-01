import { UserRound, Zap } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/client";

export default function EmpleadoSandbox({ onLog }) {
  const [nombre, setNombre] = useState("Carlos Ruiz");
  const [edad, setEdad] = useState("35");
  const [empleado, setEmpleado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);

  const crear = async () => {
    setMensaje(null);
    setLoading(true);
    const { ok, status, data } = await api.crearEmpleado(nombre, edad);
    setLoading(false);

    onLog({
      method: "POST",
      endpoint: "/api/empleado",
      call: `Empleado("${nombre}", ${edad})`,
      status,
      ok,
      result: ok ? `${data.nombre}, ${data.edad} años` : data.error,
    });

    if (!ok) {
      setMensaje({ tipo: "error", texto: data.error || "Ocurrió un error" });
      setEmpleado(null);
      return;
    }

    setEmpleado(data);
    setMensaje({ tipo: "ok", texto: "Empleado creado correctamente" });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-white/10 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
          <UserRound size={18} className="text-[#8083FF]" />
        </div>

        <label className="mb-1.5 block text-xs text-white/50">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Carlos Ruiz"
          className="mb-3 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#8083FF]/50"
        />

        <label className="mb-1.5 block text-xs text-white/50">Edad</label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="35"
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-[#8083FF]/50"
        />

        {mensaje && (
          <p className={`mt-3 text-xs ${mensaje.tipo === "error" ? "text-red-400" : "text-[#10B981]"}`}>
            {mensaje.texto}
          </p>
        )}

        <button
          onClick={crear}
          disabled={loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#494BD6] to-[#8083FF] py-3 text-sm font-semibold text-white shadow-lg shadow-[#494BD6]/20 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Zap size={15} />
          {loading ? "Procesando..." : "Crear Empleado"}
        </button>
      </div>

      {empleado && (
        <div className="rounded-xl border border-[#8083FF]/30 bg-[rgba(17,24,39,0.8)] p-5 backdrop-blur-md">
          <p className="text-xs uppercase tracking-wide text-white/40">Instancia creada</p>
          <p className="mt-2 font-mono text-xl font-bold text-white">{empleado.nombre}</p>
          <p className="font-mono text-sm text-white/50">{empleado.edad} años</p>
        </div>
      )}
    </div>
  );
}
